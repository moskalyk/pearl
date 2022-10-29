extern crate shamir;

use shamir::SecretData;
use std::result::Result;
use std::process::Command;

// fn unilead(secret_data: &SecretData, val: &Vec<u8>) -> Result<&Vec<u8>, String>
fn unilead<'a>(secret_data: &'a SecretData, val: &'a Vec<u8>) -> Result<&'a Vec<u8>, String>
// fn unilead<'a>(secret_data: &SecretData, val: &'a Vec<u8>) -> Result<&Vec<'a u8>, String>
{
    if SecretData::is_valid_share(&secret_data, &val) {
        Ok(val)
    } else {
        Err("Lukso Write".to_string())
    }
}

fn main() {
    // let readFromChainValue => shamir secrets with bls signatures.
    let secret_data = SecretData::with_secret("1,1,0,0,0,0,0,0,0,0,0,0", 5);

    let share1 = secret_data.get_share(1);
    let share2 = secret_data.get_share(2);
    let share3 = secret_data.get_share(3);
    let share4 = secret_data.get_share(4);
    let share5 = secret_data.get_share(5);

    let mut vec: Vec<u8> = vec![];
    for i in 1..25 {
        vec.push(i);
    }

    let shares: Vec<&Vec<u8>> = vec![
        &share1,
        &share2,
        &share3,
        &share4,
        &share5,
        &vec
    ];

    // println!("Recovered {:?}", vec);
    // println!("Recovered {:?}", share5);


    // send to list of sockets
    // println!("Recovered {}", SecretData::is_valid_share(&secret_data, &vec));
    // println!("Recovered {}", SecretData::is_valid_share(&secret_data, &vec));
    // println!("Recovered {}", SecretData::is_valid_share(&secret_data, &share1));
    // let recovered = SecretData::recover_secret(3, vec![share1, share2]);
    for i in 0..6 {
        let mut child = Command::new("sleep").arg("5").spawn().unwrap();
        let _result = child.wait().unwrap();
        match unilead(&secret_data, &shares[i]) {
          Err(e) => println!("an error: {:?}", e), //<= error handling
          Ok(val) => println!("func was OK {:?}", val),
        }
    }
    let recovered = SecretData::recover_secret(3, vec![share1, share2, share3]).unwrap();
    println!("Recovered {}", recovered);

    // println!("Recovered {}", recovered.chars().count());
    // println!("Recovered {}", vec.map(str::to_string).collect());
}