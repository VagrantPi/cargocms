
ALTER TABLE `ProductDescriptions` ADD `shippingData` varchar(255) DEFAULT '';
ALTER TABLE `ProductDescriptions` ADD `specification` text;
ALTER TABLE `ProductDescriptions` ADD `story` text;
ALTER TABLE `ProductDescriptions` ADD `precautions` text;

ALTER TABLE `Orders` ADD `displayName` VARCHAR(65);
ALTER TABLE `Users` ADD `displayName` VARCHAR(65);

