/// All coordinate values must implement this collection of traits.
// pub trait Scalar: Clone+PartialOrd+From<u8>+Debug
//   +Send+Sync+'static+PartialEq
//   +ToBytes+CountBytes+FromBytes
//   +Add<Output=Self>+Div<Output=Self> {}

use random::{Source,default as rand};

// use serde_json::{Result, Value};

pub trait Scalar
{
    // fn Clone(&self) -> i32;
    // fn PartialOrd(&self) -> i32;
    fn Debug(&self) -> u8;
    // fn Send(&self) -> i32;
    // fn Sync(&self) -> i32;
    // fn PartialOrd(&self) -> i32;
    // fn PartialEq(&self) -> i32;
    // fn ToBytes(&self) -> i32;
    // fn CountBytes(&self) -> i32;
    // fn FromBytes(&self) -> i32;
    // fn Add(&self) -> Self;
    // fn Div(&self) -> Self;
}

// impl Scalar for Coord<X>  {
 
//     // Method returns area of rectangle
//     // fn Clone(&self) -> i32 {
//     //     1
//     // }
//     fn Debug(&self) -> i32 {
//         println!("{}", &self)
//         2
//     }
//     // fn Send(&self) -> i32 {
//     //     3
//     // }
//     // fn Sync(&self) -> i32 {
//     //     4
//     // }
//     // fn PartialOrd(&self) -> i32 {
//     //     5
//     // }
//     // fn PartialEq(&self) -> i32 {
//     //     6
//     // }
//     // fn ToBytes(&self) -> i32 {
//     //     7
//     // }
//     // fn CountBytes(&self) -> i32 {
//     //     8
//     // }
//     // fn FromBytes(&self) -> i32 {
//     //     9
//     // }
//     // fn Add(&self) -> Self {
//     //     10
//     // }
//     // fn Div(&self) -> Self {
//     //     11
//     // }
// }

// impl Scalar for f32 {
//     fn Debug(&self) -> i32 {
//         println!("{}", &self)
//         2.0
//     }
// }
// impl Scalar for f64 {
//     fn Debug(&self) -> f64 {
//         println!("{}", &self)
//         2.0
//     }
// }

impl Scalar for u8 {
    // Method returns area of rectangle
    // fn Clone(&self) -> i32 {
    //     1
    // }
    fn Debug(&self) -> u8 {
        println!("{}", &self);
        2
    }
    // fn Send(&self) -> i32 {
    //     3
    // }
    // fn Sync(&self) -> i32 {
    //     4
    // }
    // fn PartialOrd(&self) -> i32 {
    //     5
    // }
    // fn PartialEq(&self) -> i32 {
    //     6
    // }
    // fn ToBytes(&self) -> i32 {
    //     7
    // }
    // fn CountBytes(&self) -> i32 {
    //     8
    // }
    // fn FromBytes(&self) -> i32 {
    //     9
    // }
    // fn Add(&self) -> Self {
    //     10
    // }
    // fn Div(&self) -> Self {
    //     11
    // }
}
// impl Scalar for u16 {

// }
// impl Scalar for u32 {

// }
// impl Scalar for u64 {

// }
// impl Scalar for i16 {

// }
// impl Scalar for i32 {

// }
// impl Scalar for i64 {

// }


pub enum Coord<X> where X: Scalar {
  Scalar(X),
  Interval(X,X)
}

// impl Scalar for f32 {}
// impl Scalar for f64 {}
// impl Scalar for u8 {}
// impl Scalar for u16 {}
// impl Scalar for u32 {}
// impl Scalar for u64 {}
// impl Scalar for i16 {}
// impl Scalar for i32 {}
// impl Scalar for i64 {}

// fn main() {
//     println!("Hello, world!");
//     Coord::<u8>::
//     println!("{:?}",Coord::<u8>::Scalar::Debug(10))


    // NFTPort API

    // let spot_url = format!("https://api.coinbase.com/v2/prices/{currency}-{rates}/spot",          
    //  currency = "BTC",
    //  rates = "USD");     
    // let client = Client::new();    
    // let resp_spot_price = client.get(&spot_url)        
    //      .send();

    //  let data = r#"
    // {
    //     "name": "John Doe",
    //     "age": 43,
    //     "phones": [
    //         "+44 1234567",
    //         "+44 2345678"
    //     ]
    // }"#;

    // // Parse the string of data into serde_json::Value.
    // let v: Value = serde_json::from_str(data)?;

    // // Access parts of the data by indexing with square brackets.
    // println!("Please call {} at the number {}", v["name"], v["phones"][0]);



    // let mut inserts: Vec<Row<P,V>> = (0..size).map(|_| {
    // let xmin: f32 = r.read::<f32>()*2.0-1.0;
    // let xmax: f32 = xmin + r.read::<f32>().powf(64.0)*(1.0-xmin);
    // let ymin: f64 = r.read::<f64>()*2.0-1.0;
    // let ymax: f64 = ymin + r.read::<f64>().powf(64.0)*(1.0-ymin);
    // let time: f32 = r.read::<f32>()*1000.0;
    // let value: u32 = r.read();
    // let point = (
    //     Coord::Interval(xmin,xmax),
    //     Coord::Interval(ymin,ymax),
    //     Coord::Scalar(time)
    // );
    //     Row::Insert(point, value)
    // }).collect();
    // {
    // // seed the db
    // let mut db = eyros::open_from_path3(dir.path()).await?;
    // let n = 4;

    // let batches: Vec<Vec<Row<P,V>>> = (0..n).map(|i| {
    //     inserts[size/n*i..size/n*(i+1)].to_vec()
    // }).collect();
    // for batch in batches {
    //     println!("{:?}", batch)
    //     let mut child = Command::new("sleep").arg("5").spawn().unwrap();
    //     let _result = child.wait().unwrap();
    // }
    //     // db.sync().await?;
    // }
// }

use std::fmt;

struct NData {
    scalar: u32,
}

impl fmt::Display for NData {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.scalar)
    }
}

struct SData {
    interval: Vec<String>,
}

impl fmt::Display for SData {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:?}", self.interval)
    }
}

enum Data {
    Scalar(NData),
    Interval(SData),
}

// pub enum Row<P,V> where P: Point, V: Value {
//   Insert(P,V),
//   Delete(P,V::Id)
// }

impl fmt::Display for Data {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Data::Scalar(n_data) => n_data.fmt(f),
            Data::Interval(s_data) => s_data.fmt(f),
        }
    }
}
enum Version { Version1, Version2 }

struct Point {
    x: f64,
    y: f64,
}

// Implementation block, all `Point` associated functions & methods go in here
impl Point {
    // This is an "associated function" because this function is associated with
    // a particular type, that is, Point.
    //
    // Associated functions don't need to be called with an instance.
    // These functions are generally used like constructors.
    fn origin() -> Point {
        Point { x: 0.0, y: 0.0 }
    }

    // Another associated function, taking two arguments:
    fn new(x: f64, y: f64) -> Point {
        Point { x: x, y: y }
    }

}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:?} {:?}", self.x, self.y)
    }
}

// impl DB {
//     fn new() -> Self {
//         Self(0)
//     }
//     fn clone(&self) -> Self {
//         Self {
//           storage: self.storage.clone(),
//           fields: self.fields.clone(),
//           meta_store: self.meta_store.clone(),
//           meta: self.meta.clone(),
//           trees: self.trees.clone(),
//         }
//     }
// }

fn main() {
    let n = NData { scalar: 0xff };
    let s = SData { interval: vec!["hello".to_string(), "world".to_string()] };

    println!("{}", n);
    println!("{}", s);
    let mut r = rand().seed([13,12]);
    let size = 4;
    // let mut inserts: Vec<u8> = (0..size).map(|_| {

    for i in 0..size {
    // for(i in ..size){
        // let db = DB::new()
        println!("{}", Point::new(3.0, 4.0));
    // }/
        let xmin: f32 = r.read::<f32>()*2.0-1.0;
        let xmax: f32 = xmin + r.read::<f32>().powf(64.0)*(1.0-xmin);
        let ymin: f64 = r.read::<f64>()*2.0-1.0;
        let ymax: f64 = ymin + r.read::<f64>().powf(64.0)*(1.0-ymin);
        let time: f32 = r.read::<f32>()*1000.0;
        // let value: u32 = r.read::<f32>()*1000.0;
        // println!("{:?}, {:?}, {:?}, {:?}, {:?}, ", xmin, xmax, ymin, ymax, time);
        // let point = (
        //   Coord::Interval(xmin,xmax),
        //   Coord::Interval(ymin,ymax),
        //   Coord::Scalar(time)
        // );
        // Row::Insert(point, value)
        // Ok(value)
        // match value {
        //     None => Err("invalid header length"),
        //     Some(&1) => Ok(Version::Version1),
        //     Some(_) => Err("invalid version"),
        // }
        // value
      }
    // .collect();

    let d_n = Data::Scalar(n);
    let d_s = Data::Interval(s);

    println!("{}", d_n);
    println!("{}", d_s);
}