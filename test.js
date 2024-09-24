const mongoose = require("mongoose");

const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost:27017/my_database");

// BlogPost.create({
//     title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
//     body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year.They go like this:"
// });

async function fetchData() {
    try{
        const users = await BlogPost.find({});
        console.log("find",users);
    } catch(error) {
        console.log(error);
    }
};

async function findDataById(id) {
    try{
        const data = await BlogPost.findById(id);
        console.log("find by id",data);
    } catch(error) {
        console.log(error);
    }
};

async function updateDataById(id) {
    try{
        await BlogPost.findByIdAndUpdate(id, {
            title: "Update title2"
        });
        data = await BlogPost.findById(id);
        console.log("already update", data);
    } catch(error) {
        console.log(error);
    }
}

async function deleteDataById(id) {
    try{
        await BlogPost.findByIdAndDelete(id);
        console.log("already delete", id);
    } catch(error) {
        console.log(error);
    }
}

const id='66c9d56fdc4e213dd8c7ebee';
fetchData();
findDataById(id);
updateDataById(id);
deleteDataById(id);

