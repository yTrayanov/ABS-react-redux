const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    seats:[{type:mongoose.Schema.Types.ObjectId , ref:'Seat'}],
    rows:{type:mongoose.Schema.Types.Number , required:true , max:100},
    columns:{type:mongoose.Schema.Types.Number , required:true , max:10},
    seatClass:{type:mongoose.Schema.Types.String, required:true},
    availableSeats:{type:mongoose.Schema.Types.Number}
})

sectionSchema.path('seatClass').validate(value =>{
    if(value === 'first' || value ==='bussiness' || value=== 'economy'){
        return true;
    }

    return false;
});

const Section = mongoose.model('Section' , sectionSchema);

module.exports = Section;
