/*
/// Module: example1
module example1::example1;
*/
module example1::whitelist;

use iota::object::{Self as object, UID};
use iota::transfer::{Self, public_share_object};
use iota::tx_context::{Self as tx_context, TxContext};
use iota::vec_map::{Self as vec_map, VecMap};

const E_NOT_OWNER: u64 = 100;

public struct Whitelist has key,store { id: UID, allowed: VecMap<address, bool>, owner: address }



fun init(ctx: &mut TxContext) {
    let sender = tx_context::sender(ctx);

    let wl = Whitelist {
        id: object::new(ctx),
        allowed: vec_map::empty<address, bool>(),
        owner: sender,
    };

    public_share_object(wl);
}


public entry fun add_to_whitelist(wl: &mut Whitelist, user: address, ctx: &mut TxContext) {
    assert!(tx_context::sender(ctx) == wl.owner, E_NOT_OWNER);

    vec_map::insert(&mut wl.allowed, user, true);
}



public entry fun remove_from_whitelist(wl: &mut Whitelist, user: address, ctx: &mut TxContext) {
    assert!(tx_context::sender(ctx) == wl.owner, E_NOT_OWNER);


    vec_map::remove(&mut wl.allowed, &user);
}


public fun is_whitelisted(wl: &Whitelist, user: address): bool {
    vec_map::contains(&wl.allowed, &user)
}
