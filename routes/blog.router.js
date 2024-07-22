import express from "express";
const router = express.Router()

router.get("/add-new",(req,res)=>{
    console.log("hello");
    res.render("addblog")
  })

  export default router;
  
