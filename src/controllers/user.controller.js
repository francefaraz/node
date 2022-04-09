const User = require('../schema/user.schema');
// const Post= require('../schema/post.schema');

const aggregate =  User.aggregate([     
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'userId',
        as: 'posts',
      },
    },
    {
        $project: {
          name:'$name',
          posts: { $size: '$posts' },
          
        },
      },
  ]);

module.exports.getUsersWithPostCount = async (req, res) => {
    
    try {
        var page=req.query.page || 1;
        console.log(page)
          const options = {
            page: parseInt(page),
            limit: 10,
           
        };
        
        User.aggregatePaginate(aggregate,options).then((data) => {
            res.send({
                "data":{

              users: data.docs,
              "pagination":{
                "totalDocs": data.totalDocs,
                "limit": data.limit,
                "page": data.page,
                "totalPages": data.totalPages,
                "pagingCounter": data.pagingCounter,
                "hasPrevPage": data.hasPrevPage,
                "hasNextPage": data.hasNextPage,
                "prevPage": data.prevPage,
                "nextPage": data.nextPage,
              }
                }
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving data.",
            });});
        } catch (error) {
          res.status(404).json({
            status: 'fail',
            message: error,
          });
        }
      };