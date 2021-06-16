const User = require("../../models/authentication");
const { errorMessage } = require("../response");
const { check, validationResult } = require("express-validator");
const PostSchema = require("../../models/post");
const Recruiter = require("../../models/recruiter");

// get the client id passes in route
exports.getLoggedById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if (error) {
            return res.status(400).json(errorMessage(`No User profile found`));
        }
        req.profile = user;
        next();
    });
};

// Creating the Post who logged in as Client (InComplete)
exports.createPosts = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errorMessage(errors.array()[0].msg));
    }

    var post = new PostSchema(req.body);

    post.save((err, post) => {
        if (err) {
            return res.status(400).json(errorMessage(`Post is already exist.`));
        }
        const { _id } = post;
        Recruiter.countDocuments({}, (er, recCount) => {
            PostSchema.countDocuments({}, (err, postCount) => {
                let postlimit = Math.ceil(postCount / recCount);
                // {
                //     $cond: {
                //         if: { $isArray: "$assingedpost" },
                //         then: {
                //             $cond: {
                //                 if: { $size: { $lt: postlimit } },
                //                 then: { $push: { assingedpost: _id } },
                //                 else: "NA",
                //             },
                //         },
                //         else: "NA",
                //     },
                // },

                Recruiter.updateOne(
                    { $size: 'assingedpost' },
                    { assingedpost: { $lte: postlimit } },
                    { $push: { assingedpost: _id } },

                    (err, post) => {
                        if (err) {
                            console.log("ERRORO", err);
                        }

                        console.log(post);
                        res.status(200).json({
                            EX_CODE: 1,
                            SUCCESS: "Post Created successfully",
                        });
                    }
                );
            });
        });
    });
};

exports.assignePost = (req, res) => { };
