use shamir::SecretData;
use std::result::Result;
use std::process::Command;
use std::option::Option;
use std::fmt;

use rand::Rng;

// sneakernet
#[derive(Debug)]
struct FootprintBuilder {
    seed: u32, // 
    prefix: Option<&'static str>, // arbr tree
    slot: Option<u64>, // 
    hasheable: Vec<u8>, // secret from unilead
}

pub enum IType {
    /// Boolean.
    Boolean,

    // /// A 8-bits signed integer.
    S8,

    // /// A 16-bits signed integer.
    // S16,

    // /// A 32-bits signed integer.
    // S32,

    // /// A 64-bits signed integer.
    // S64,

    // /// A 8-bits unsigned integer.
    // U8,

    // /// A 16-bits unsigned integer.
    // U16,

    // /// A 32-bits unsigned integer.
    // U32,

    // /// A 64-bits unsigned integer.
    // U64,

    // /// A 32-bits float.
    // F32,

    // /// A 64-bits float.
    // F64,

    // /// A string.
    // String,

    // /// Specialization of arrays for byte vector.
    // ByteArray,

    // /// An array of values of the same type.
    // Array(Box<IType>),

    // /// A 32-bits integer (as defined in WebAssembly core).
    // I32,

    // /// A 64-bits integer (as defined in WebAssembly core).
    // I64,

    // /// A record contains record index from interfaces AST.
    // Record(u64),
}

// impl ToString for &IType {
//     fn to_string(&self) -> String {
//         match &self {
//             IType::Boolean => "bool".to_string(), // :: direction on line, force or moderated
//             // IType::S8 => "s8".to_string(),//  :: ArBr octagonal structure, considering tree modifications and NFT energy, -/+
//             // IType::S16 => "s16".to_string(),//  :: Deep6 monoclinic & hexagonal crystalline structures
//             // IType::S32 => "s32".to_string(),//  :: LukSo ERC725 address, generating bits from create2, uploaded pearl points of digital fashion from bytes of guardian block stream
//             // IType::S64 => "s64".to_string(),//  :: 64 bit clock, run as an whl -> iching tarot deciding on information rate for support
//             // IType::U8 => "u8".to_string(),//  :: <- NftPort reading polygon, timing of polygon / ethereum -> fluence to ipfs, stored local -> c3 nouns to uqbar -> rollers ** mods -> swipe with credit card for gs repayments to ssv like
//             // IType::U16 => "u16".to_string(),//  :: Affordable housing quads with gold & timber, work with wei stream, quartz_window_type
//             // IType::U32 => "u32".to_string(),//  :: Metis 12600 timing of hands
//             // IType::U64 => "u64".to_string(),//  :: Waterflow -> EthoStep -> Charm calculation -> options contracts on astrology -> 3space of galaxy --> astrology signs as radians
//             // IType::F32 => "f32".to_string(),//  :: Medspace Matter.direct aizawa attractor typedef struct {
//             // //   c3_w mug_w; // alpha
//             // //   c3_w len_w; // beta
//             // //   c3_w buf_w[0];    //  actually [len_w] // delta
//             // // } u3a_atom;
//             // IType::F64 => "f64".to_string(), // :: BLS alternatives graph
//             // IType::String => "string".to_string(), // :: city_choice:{garmentId,..|..,accessoryId}
//             // IType::ByteArray => "array (u8)".to_string(), // :: Guardian toBytes Stream
//             // IType::Array(ty) => format!("array ({})", ty.as_ref().to_string()), // :: Pearl Path & Gifts On a clock ::> javaspcript svg -> treemap bit rate from morse code --> mnumbers 
//             // IType::I32 => "i32".to_string(), // :: digital blur -^ -> 82->91
//             // IType::I64 => "i64".to_string(), // :: footprints -> usb club ->!(*)
//             // IType::Record(record_type_id) => format!("record {}", record_type_id),
//         }
//     }
// }

struct Particle {
    Type: IType,
    footprint: FootprintBuilder
}

impl fmt::Display for IType {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            IType::Boolean => write!(f, "Linux"),
            IType::S8 => write!(f, "macOS"),
            // Particle::Windows => write!(f, "Windows"),
            // Particle::Unknown => write!(f, "unknown"),
        }
    }
}

fn main() {

    for i in 0..6 {
        let mut child = Command::new("sleep").arg("5").spawn().unwrap();
        let _result = child.wait().unwrap();
        let mut rng = rand::thread_rng();

        let n1: u32 = rng.gen::<u32>();

        let f = FootprintBuilder {
            seed        : n1,
            prefix      : Some("5☘,2🂡,3🂡,K♥,3◆,6♥,J◆,9◆,Q🂡,K🂡,K☘,10🂡"),
            slot        : Some(i),
            hasheable   : vec![1, 243, 104, 214, 16, 187, 103, 181, 175, 212, 119, 4, 203, 101, 109, 137, 229, 105, 3, 40, 87, 45, 208, 71, 173, 220, 129, 249, 129, 77, 103, 88, 157, 59, 184, 153, 140, 37, 61, 4, 124, 152, 154, 88, 120, 218, 242, 35, 226, 238, 137, 155, 144, 209, 189, 137, 222, 84, 94, 168, 122, 14, 90, 132, 216, 163]
        };
        println!("{:?}", f);

        // on fork of change, change from boolean to s8 with 5/8 participants
        // 
        let p = Particle {
            Type: IType::Boolean,
            footprint: f
            // Force: true
        };
        println!("{}", p.Type.to_string());
        println!("{:?}", p.footprint);

    }
}
