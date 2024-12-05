import path from "path";
import express from 'express'
import Blogs from "./Model/Blogs.js";
import { ConnectToMongoDb } from "./db.js";

ConnectToMongoDb();

const app = express();
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/blogs/:page', async(req, res) => {

  const result=await Blogs.find().skip((req.params.page - 1) * 5)
  .limit(5);
  const totalItems = await Blogs.find();
  res.json({ totalItems: totalItems.length, response: result });
});

app.get('/api/blogs/:searchTerm/:page', async(req, res) => {
  
  const result=await Blogs.find({ 
    $or: [
      { title: { $regex: req.params.searchTerm, $options: "i" } },
      { category: { $regex: req.params.searchTerm, $options: "i" } }
    ]
  }).skip((req.params.page - 1) * 5)
  .limit(5);
  const totalItems = await Blogs.find({ 
    $or: [
      { title: { $regex: req.params.searchTerm, $options: "i" } },
      { category: { $regex: req.params.searchTerm, $options: "i" } }
    ]
  });
  res.json({ response: result, totalItems: totalItems.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
