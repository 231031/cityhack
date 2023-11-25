const UserSeller = require('../../models/UserSeller');

module.exports = async(req, res) => {
    let id = req.session.userId;
    let id2 = req.params.id;
    let UserSellerData = await UserSeller.findById(id);
    let UserSellerData2 = await UserSeller.findById(id2);
    let warningLocation = "";
    if (UserSellerData || UserSellerData2) {
        if (req.session.message){
            warningLocation = req.session.message;
            console.log("homeSellerController");
            delete req.session.message;
        }
        if (UserSellerData2) {
            UserSellerData = UserSellerData2;
        }
        req.session.userId = UserSellerData._id;
        console.log(warningLocation);
        res.render('homeSeller', {
            UserSellerData,
            warningLocation,
        })
    } else {
        res.redirect('/seller/login');
    }
}