# pearl

a cli simulation for monetary systems

fantasizing about a type of monetary system, that maintains a gini-coefficient closer to 0, where the members less than the average get an opportunity to purchase items at a discount for redistribution purposes, money made up through reserve minting / burning per tx.

## discount system

The repurchasing notifications would be distributed based on bands of products or services, as something like the following:
```js
  0: '🃟_COFFEE_MEAL',
  1: '⚚_TAXIS_MEDECINE_GROCERIES',
  2: '♕_MUSIC_BOOKS_GAMES',
  3: '⚘_FASHION_ELECTRONICS_MOVIES',
  4: '♖_EDUCATION_CARS',
  5: '♔_TRAVEL_HOME',

```

## connections

The system would source the multiplier for keeping the gini-coefficent discount within check by looking at the number of p2p connections in a system.

So, with less connection reaching a certain max, you achieve more people recieving discounts of all the ranges (they would work in culmination).
e.g. @ 2^5 you get notifications for ♔_TRAVEL_HOME
e.g. @ 2^8 you get notifications beginning at 🃟_COFFEE_MEAL that oscillates in the higher ranges

The idea is to match with a stable currency, so in every purchase, more or less supply is minted / burned to equate to a fully on-chain currency, which is gated via Worldcoin.

## TODO: 
Connect to a non-invasive brain computer interface, so that notifications can be paired to colors on a hardware device, so someone can know it's time to pick up croissants at a discount, or, book a flight to dance in europe.

# example

### no discount, increases steadily 
```

    __________________________________________________________________
    ____________________________________________________________ _ _ _
    ______________________________________________ _ _ _______ _ _ _ _
0.3 __________________________________________ _ _ _ _ _ _ _ _ _ _ _ _
    ________________________________________ _ _ _ _ _ _ _ _ _ _ _ _ _
    ____________________________________ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    ______________________ ___ ___ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    __________________ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
0.2 ______ _ _ _____ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    1   3   5   7   9   11  13  15  17  19  21  23  25  27  29  31
```


### with discounts, does not break .01
```

    __________________________________________________________________
    __________ _______________________________________ _ _ ___________
    ____ _ _ _ _______________________________________ _ _ ___________
     _ _ _ _ _ _______________________________________ _ _ _ _________
     _ _ _ _ _ _______________________________________ _ _ _ _________
     _ _ _ _ _ _______________________________________ _ _ _ _________
     _ _ _ _ _ _______________________________________ _ _ _ _ _______
     _ _ _ _ _ _______________________________________ _ _ _ _ _______
0.0  _ _ _ _ _ _________________________________ _ _ _ _ _ _ _ _ _ ___
    1   3   5   7   9   11  13  15  17  19  21  23  25  27  29  31
```

Considering each block of change of the gini coefficent, we produce and alteration to localized matching of spirit.

/// Encode an `IType` into a string.
// TODO: consider change to impl Display
impl ToString for &IType {
    fn to_string(&self) -> String {
        match &self {
            IType::Boolean => "bool".to_string(), :: direction, force or or moderated
            IType::S8 => "s8".to_string(), :: ArBr octagonal structure, considering tree modifications and NFT energy, -/+
            IType::S16 => "s16".to_string(), :: Deep6 monoclinic & hexagonal crystalline structures
            IType::S32 => "s32".to_string(), :: <- NftPort reading polygon lots on blockchain, timing of polygon / ethereum -> fluence to ipfs, stored local -> c3 nouns to uqbar -> rollers ** mods -> swipe with credit card for gs repayments to ssv like
            IType::S64 => "s64".to_string(), :: 64 bit clock, run as an whl -> iching tarot deciding on information rate for support
            IType::U8 => "u8".to_string(), :: LukSo ERC725 address, generating bits from create2, uploaded pearl points of digital fashion
            IType::U16 => "u16".to_string(), :: Affordable housing quads with gold & timber, work with wei
            IType::U32 => "u32".to_string(), :: Metis 12600 timing of hands
            IType::U64 => "u64".to_string(), :: Waterflow -> EthoStep -> Charm calculation -> options contracts on astrology -> 3space of galaxy --> astrology signs
            IType::F32 => "f32".to_string(), :: Medspace Matter.direct typedef struct {
              c3_w mug_w;
              c3_w len_w;
              c3_w buf_w[0];    //  actually [len_w]
            } u3a_atom;
            IType::F64 => "f64".to_string(), :: Matter.direct Light -> Unib8nk & Tarots
            IType::String => "string".to_string(), :: city_choice
            IType::ByteArray => "array (u8)".to_string(), :: recording money flow
            IType::Array(ty) => format!("array ({})", ty.as_ref().to_string()), :: Pearl Path & Gifts On a clock ::> javaspcript svg -> treemap bit rate from morse code --> mnumbers 
            IType::I32 => "i32".to_string(), :: digital blur -^ -> 82->91 Uniswap
            IType::I64 => "i64".to_string(), :: footprints -> usb club ->!(*)
            IType::Record(record_type_id) => format!("record {}", record_type_id),
        }
    }
}

- Phone Device Design
- Eink 
- Tablet back, places to place crystals in certain shapes
- Morse code mapping --> Emojis, making the blind feel again
- eye scanners for emojis