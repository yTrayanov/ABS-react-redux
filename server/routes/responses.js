const BadRequest = (res, message , error) => res.status(400).json({
    message,
    error
})

const Ok = (res , message , data) => res.status(200).json({
    message,
    data
});

const Created = (res , message , data) => res.status(201).json({
    message,
    data
});

const Unauthorized = (res , message , data) => res.status(401).json({
    message,
    data
})

module.exports ={
    BadRequest,
    Ok,
    Created,
    Unauthorized
}

