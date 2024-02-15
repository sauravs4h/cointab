const { Post } = require("../models/Post.model");
const Excel = require("exceljs");
const fs = require("fs");

const addPost = async (req, res) => {
  const { id, userId, name, title, body, company } = req.body;

  try {
    let payload = {
      id,
      userId,
      name,
      title,
      body,
      company,
    };

    let newPost = Post.build(payload);
    await newPost.save();

    res.status(200).json({ message: "post added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOnePost = async (req, res) => {
  const { userId } = req.params;

  try {
    let post = await Post.findOne({ where: { userId: userId } });

    if (post) {
      res.status(200).json({ isAvailable: true,post });
    } else {
      res.status(200).json({ isAvailable: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendExcelFile = async (req, res) => {
  const { userId } = req.params;

  try {
    let data = await Post.findAll({ where: { userId: userId } });

    // Create a new Excel workbook
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Define column names
    const columns = [
        { header: 'id', key: 'id', width: 10 },
        { header: 'userId', key: 'userId', width: 10 },
        { header: 'name', key: 'name', width: 20 },
        { header: 'title', key: 'title', width: 20 },
        { header: 'body', key: 'body', width: 40 },
        { header: 'company', key: 'company', width: 20 },
    ];

    // Add columns to worksheet
    worksheet.columns = columns;

    // Populate Excel worksheet with data
    data.forEach((row) => {
        worksheet.addRow(row);
    });

    // Save the workbook to a file
    const filePath = './data.xlsx';
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, 'data.xlsx', (err) => {
        if (err) {
            console.error('Error sending file: ', err);
            res.status(500).end();
        } else {
            // Delete the file after sending
            fs.unlinkSync(filePath);
        }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addPost, getOnePost,sendExcelFile };
