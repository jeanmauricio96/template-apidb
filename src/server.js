import 'dotenv/config';
import app from './app';

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server up amd running on port ${port}🚀️🚀️`);
});
