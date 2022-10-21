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

### with discounts, does not break .01
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
