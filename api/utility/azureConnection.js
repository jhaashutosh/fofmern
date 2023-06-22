const { BlobServiceClient } = require("@azure/storage-blob");
const multer = require("multer");
const MulterAzureStorage = require("multer-azure-storage");
const dotenv = require("dotenv").config();

const storageConnectionString = process.env.STORAGE_CONNECTION_STRING;
const azureAccountName = process.env.AZURE_ACCOUNT_NAME;
const azureAcessKey = process.env.ACCESS_KEY;
const containerName = "fofimages";

const azureConnection = () => {
  // Create a BlobServiceClient using your storage account connection string
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    storageConnectionString
  );

  // Check if the connection is established
  blobServiceClient
    .getProperties()
    .then(() => {
      console.log("Connection to Azure Blob Storage established successfully");
    })
    .catch((error) => {
      console.error(
        "Failed to establish connection to Azure Blob Storage:",
        error
      );
      process.exit(1); // Exit the application if the connection fails
    });

  // Create a container in your storage account (if it doesn't exist)
  const containerClient = blobServiceClient.getContainerClient(containerName);
  containerClient
    .createIfNotExists()
    .then(() => {
      console.log("Container created successfully or already exists");
    })
    .catch((error) => {
      console.error("Failed to create container:", error);
      process.exit(1);
    });
};

// Configure multer to use Azure Blob Storage as the storage engine
exports.azureStorageConfig = new MulterAzureStorage({
  connectionString: storageConnectionString,
  azureStorageAccount: azureAccountName,
  azureStorageAccessKey: azureAcessKey,
  containerName: containerName,
  containerSecurity: "blob",
});

const upload = multer({ storage: this.azureStorageConfig });
const uploadImage = upload.single("image");

module.exports = { uploadImage, azureConnection };
