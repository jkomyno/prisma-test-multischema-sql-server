EXEC('CREATE SCHEMA [transactional]');
EXEC('CREATE SCHEMA [base]');

DROP TABLE IF EXISTS [transactional].[Order];
CREATE TABLE [transactional].[Order] (
    [id] INT NOT NULL,
    [user_id] INT NOT NULL,
    CONSTRAINT [Order_pkey] PRIMARY KEY CLUSTERED ([id])
);

DROP TABLE IF EXISTS [base].[User];
CREATE TABLE [base].[User] (
    [id] INT NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

ALTER TABLE [transactional].[Order] ADD CONSTRAINT [Order_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [base].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;
