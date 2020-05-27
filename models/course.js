const { Schema, model } = require("mongoose");

const courseShcema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

courseShcema.method("toClient", function () {
  const course = this.toObject();
  course.id = course._id;
  delete course._id;

  return course;
});

module.exports = model("Course", courseShcema);
