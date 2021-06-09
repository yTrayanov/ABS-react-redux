const BadRequest = (res, message , error) => res.status(400).json({
    success: false,
    message,
    error
})

const Ok = (res , message , data) => res.status(200).json({
    success:true,
    message,
    data
});

const Created = (res , message , data) => res.status(201).json({
    success:true,
    message,
    data
});

module.exports ={
    BadRequest,
    Ok,
    Created
}

