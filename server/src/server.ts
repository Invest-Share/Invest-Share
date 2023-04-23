// Has app logic in another file, separated with the app.listen code so only the app logic will be exported to test file for supertest.
import app from './utils/app';

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
