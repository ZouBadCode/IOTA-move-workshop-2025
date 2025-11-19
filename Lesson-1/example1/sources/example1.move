/*
/// Module: example1
module example1::example1;
*/
module example1::whitelist;
use std::string::{Self, String};
use iota::object::{Self as object, UID};
use iota::transfer::{Self, public_share_object};
use iota::tx_context::{Self as tx_context, TxContext};
use iota::vec_map::{Self as vec_map, VecMap};


public struct Whitelist has key,store {
    id: UID,
    allowed: VecMap<address, String>,
}


fun init(ctx: &mut TxContext) {
    let wl = Whitelist {
        id: object::new(ctx),
        allowed: vec_map::empty<address, String>(),

    };
    public_share_object(wl);
}


public entry fun add_to_whitelist(wl: &mut Whitelist,name:vector<u8> ,user: address, ctx: &mut TxContext) {
    let name_str = string::utf8(name);
    vec_map::insert(&mut wl.allowed, user, name_str);
}


public fun is_whitelisted(wl: &Whitelist, user: address): bool {
    vec_map::contains(&wl.allowed, &user)
}
