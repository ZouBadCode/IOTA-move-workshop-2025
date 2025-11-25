module objecthero::hero;

use iota::address;
use iota::coin::{Self, Coin, TreasuryCap};
use iota::object::{UID, new as object_new};
use iota::random::{Self, Random};
use iota::transfer::{Self, public_share_object, transfer};
use iota::tx_context::{Self, TxContext};
use iota::vec_map::{Self as vec_map, VecMap, empty as vec_map_empty};
use iota::clock::{Self, Clock};
use objecthero::heroc_token::{Self, HEROC_TOKEN};


public struct GameTreasuryCap has key, store {
    id: UID,
    cap: TreasuryCap<HEROC_TOKEN>,
}

public struct Gem has key, store {
    id: UID,
    power: u64,
}
public struct Sword has key, store {
    id: UID,
    power: u64,
    gem: Option<Gem>,
}

public struct Shield has key, store {
    id: UID,
    power: u64,
    gem: Option<Gem>,
}

public struct Hero has key {
    id: UID,
    proficiency: u64,
    power: u64,
    sword: Option<Sword>,
    shield: Option<Shield>,
}

public struct FightList has key, store {
    id: UID,
    ranking: VecMap<address, u64>,
    cooldown:VecMap<UID, u64>,

}

const MINT_HERO_PRICE: u64 = 50_000_000_000;
const MINT_HERO_DECIMALS: u64 = 1_000_000_000;

fun init(ctx: &mut TxContext) {
    let list = FightList {
        id: object_new(ctx),
        ranking:vec_map_empty(), 
        cooldown:vec_map_empty(),
    };

    public_share_object(list);
}

public entry fun setup_game_treasury(treasury_cap: TreasuryCap<HEROC_TOKEN>, ctx: &mut TxContext) {
    let treasury_obj = GameTreasuryCap {
        id: object::new(ctx),
        cap: treasury_cap,
    };

    transfer::public_share_object(treasury_obj);
}

fun random_value(r: &Random, low: u64, high: u64, ctx: &mut TxContext): u64 {
    let mut generator = random::new_generator(r, ctx);
    let random_num = random::generate_u64_in_range(&mut generator, low, high);
    random_num
}

fun intenal_sword(power: u64, ctx: &mut TxContext): Sword {
    Sword {
        id: object::new(ctx),
        power: power,
        gem: option::none(),
    }
}

fun intenal_shield(power: u64, ctx: &mut TxContext): Shield {
    Shield {
        id: object::new(ctx),
        power: power,
        gem: option::none(),
    }
}

public entry fun create_sword(r: &Random, ctx: &mut TxContext) {
    let power = random_value(r, 1, 15, ctx);
    let sword = intenal_sword(power, ctx);

    transfer::public_transfer(sword, tx_context::sender(ctx));
}

public entry fun create_shield(r: &Random, ctx: &mut TxContext) {
    let power = random_value(r, 2, 6, ctx);
    let sword = intenal_shield(power, ctx);

    transfer::public_transfer(sword, tx_context::sender(ctx));
}

public entry fun create_hero_with_equipment(
    r: &Random,
    game_coin_cap:  &mut GameTreasuryCap,
    owned_sword: Sword,
    owned_shield: Shield,
    mut payment: Coin<HEROC_TOKEN>,
    ctx: &mut TxContext,
) {
    let paid_amount = coin::value(&payment);
    assert!(paid_amount == MINT_HERO_PRICE, 9999);

    let treasury_cap_ref = &mut game_coin_cap.cap;
    heroc_token::burn(treasury_cap_ref, payment);



    let power = random_value(r, 5, 8, ctx);
    let newproficiency = random_value(r, 120, 200, ctx);

    let person = Hero {
        id: object::new(ctx),
        proficiency: newproficiency,
        power: power,
        sword: option::some(owned_sword),
        shield: option::some(owned_shield),
    };
    transfer::transfer(person, tx_context::sender(ctx));
}

public entry fun create_hero(
    r: &Random,
    game_coin_cap:  &mut GameTreasuryCap,
    mut payment: Coin<HEROC_TOKEN>,
    ctx: &mut TxContext,
) {
    let paid_amount = coin::value(&payment);
    assert!(paid_amount >= MINT_HERO_PRICE, 9999);

    let treasury_cap_ref = &mut game_coin_cap.cap;
    heroc_token::burn(treasury_cap_ref, payment);

    let power = random_value(r, 5, 8, ctx);
    let newproficiency = random_value(r, 120, 200, ctx);

    let person = Hero {
        id: object::new(ctx),
        proficiency: newproficiency,
        power: power,
        sword: option::none(),
        shield: option::none(),
    };
    transfer::transfer(person, tx_context::sender(ctx));
}

public fun get_current_time(clock: &Clock): u64 {
        clock::timestamp_ms(clock)
}

fun attack_quantity(wl: &mut FightList, attack: u64, sender: address,hero: &Hero,clock: &Clock) {
    
    if (vec_map::contains(&wl.ranking, &sender)) {
        let current_score_ref = vec_map::get_mut(&mut wl.ranking, &sender);
        *current_score_ref = *current_score_ref + attack;
    } else {
        //不存在: 直接插入新的分數
        vec_map::insert(&mut wl.ranking, sender, attack);
    }

    let current_time_ms = get_current_time(clock);
    let hero_id_ref = object::id(hero);

    //確認時間 8 hr = 28,800,000 
    if (vec_map::contains(&wl.cooldown, &sender)) {
        let current_score_ref = vec_map::get_mut(&mut wl.cooldown, hero_id_ref);
        // *current_score_ref = *current_score_ref + attack;

        assert!(current_time_ms >= current_score_ref +  28_800_000, 9999);
        *current_score_ref = *current_score_ref + 28_800_000;


    } else {
        vec_map::insert(&mut wl.cooldown, hero_id_ref, current_time_ms);
    }


}

public entry fun attack_the_boss(
    clock: &Clock,
    r: &Random,
    game_coin_cap: &mut GameTreasuryCap,
    hero: &Hero,
    wl: &mut FightList,
    ctx: &mut TxContext,
) {
    let sender = tx_context::sender(ctx);

    let sword_option = &hero.sword;
    let shield_option = &hero.shield;

    let mut end_power = 0;

    if (option::is_some(sword_option)) {
        let sword_ref = option::borrow(sword_option);
        end_power = end_power + sword_ref.power;
    };

    if (option::is_some(shield_option)) {
        let shield_ref = option::borrow(shield_option);
        end_power = end_power + shield_ref.power;
    };

    let newproficiency = random_value(r, 50, hero.proficiency, ctx);

    // 計算公式
    let attack_power = ((hero.power + end_power) * newproficiency * MINT_HERO_DECIMALS) / 100;

    let treasury_cap_ref = &mut game_coin_cap.cap;

    heroc_token::mint(
        treasury_cap_ref,
        attack_power,
        tx_context::sender(ctx),
        ctx,
    );

    attack_quantity(wl, attack_power, sender,hero,clock);
}

public entry fun unwrapItems(mut hero: Hero, ctx: &mut TxContext) {
    let sender = tx_context::sender(ctx);

    if (option::is_some(&hero.sword)) {
        let sword_object = option::extract(&mut hero.sword);
        transfer::transfer(sword_object, sender);
    };

    if (option::is_some(&hero.shield)) {
        let shield_object = option::extract(&mut hero.shield);
        transfer::transfer(shield_object, sender);
    };

    transfer::transfer(hero, sender);
}
