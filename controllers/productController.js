const Firm = require("../models/Firm");
const Product = require("../models/Product");
const multer = require("multer");
const { db } = require("../models/Vendor");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + Path2D.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestseller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(401).json({ error: "no firm found" });
    }

    const product = new Product({
      productName,
      price,
      category,
      bestseller,
      description,
      image,
      firm : firm._id,
    });

    const saveProduct = await product.save();

    firm.products.push(saveProduct);
    await firm.save();

     res.status(200).json(saveProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error"});
  }
};

const getProductByFirm = async(req, res) =>{
    try {   
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error: "No firm Found"});
        }
        
        const resturantName = firm.firmName;

        const products = await Product.find({firm: firmId});
        res.status(200).json({ resturantName, products });

    } catch (error) {   
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const destroyProductById = async(req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if(!deletedProduct){
      return res.status(404).json({error: "no product found"});
    }

    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {addProduct: [upload.single('image'), addProduct], getProductByFirm, destroyProductById};
