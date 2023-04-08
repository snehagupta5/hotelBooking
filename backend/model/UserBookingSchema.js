const mongoose = require("mongoose");

const UserBookingSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId ,required:true},
  place:{type:mongoose.Schema.Types.ObjectId, ref:'Place' ,required:true},
  checkIn: {  type: Date,
  required: true,},
  checkOut:{  type: Date,
    required: true,},
  maxGuest:{type:Number, required:true},
  name:{type:String, required:true},
  mobile:{type:String, required:true},
  price:Number,

});

const UserBookingModel = mongoose.model("UserBooking", UserBookingSchema);
module.exports = UserBookingModel;