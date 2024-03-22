const { catchAsynError } = require("../middlewares/catchAsuncError");

exports.home = catchAsynError(async (req, res) => {
        res.json({ message: 'internshala' });
})

