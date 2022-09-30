import Post from "../models/Post.js";

export const getWritePost = (req, res) => {
  res.render("write-post", { pageTitle: "Write Post" });
};

export const postWritePost = async (req, res) => {
  const { files } = req;
  const {
    body: { content, hashtags },
  } = req;
  const result = await Post.create({
    imagesUrl: Post.formatImagesUrl(files),
    content,
    hashtags: Post.formatHashtags(hashtags),
  });
  res.redirect("/");
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.redirect("/");
};

export const getPostEdit = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  return res.render("post-edit", { pageTitle: "Edit", post });
};

export const postPostEdit = async (req, res) => {
  const { id } = req.params;
  const {
    body: { content, hashtags },
  } = req;
  await Post.findByIdAndUpdate(id, {
    content,
    hashtags: Post.formatHashtags(hashtags),
  });
  res.redirect("/");
};
