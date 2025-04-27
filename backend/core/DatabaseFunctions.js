require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('CNSL_CONN MongoDB Connected');
    } catch (error) {
        console.error('CNSL_ERR_CONN MongoDB Connection Error: ', error);
        process.exit(1);
    }
}

const InsertDocument = async (collection, data) => {
    try {
        const Model = require('../models/'+collection);
        const Document = await new Model(data).save();
        console.log('CNSL_INSR Document Inserted');
        return Document._id.toString();
    } catch (error) {
        console.error('CNSL_ERR_INSR MongoDB Error: ', error);
        return false;
    }
}

const UpdateDocument = async (collection, condition = {}, data = {}) => {
    try{
        const Model = require('../models/'+collection);
        const Document = await Model.updateOne(condition, data);
        console.log('CNSL_UPDT Document Updated');
        return Document.modifiedCount;
    } catch (error) {
        console.error('CNSL_ERR_UPDT MongoDB Error: ', error);
        return false;
    }
}

const UpdateDocuments = async (collection, condition = {}, data = {}) => {
    try{
        const Model = require('../models/'+collection);
        const Document = await Model.updateMany(condition, data);
        console.log('CNSL_UPDT Documents Updated');
        return Document.modifiedCount;
    } catch (error) {
        console.error('CNSL_ERR_UPDT MongoDB Error: ', error);
        return false;
    }
}

const FindDocuments = (collection, condition = {}, projection = 'id', sort = {}) => {
    const Model = require('../models/'+collection);
    const Document = Model.find(condition, projection).sort(sort).exec();
    return Document;
}

const FindDocument = (collection, condition = {}, projection = 'id') => {
    const Model = require('../models/'+collection);
    const Document = Model.findOne(condition, projection).exec();
    return Document;
}

const DeleteDocument = async (collection, condition) => {
    try {
        const Model = require('../models/' + collection);
        const Document = await Model.deleteOne(condition);
        console.log('CNSL_DLT Document Deleted');
        return Document.deletedCount;
    } catch (error) {
        console.error('CNSL_ERR_DLT MongoDB Error: ', error);
        return false;
    }
}

const DeleteDocuments = async (collection, condition) => {
    try {
        const Model = require('../models/' + collection);
        const Document = await Model.deleteMany(condition);
        console.log('CNSL_DLT Documents Deleted');
        return Document.deletedCount;
    } catch (error) {
        console.error('CNSL_ERR_DLT MongoDB Error: ', error);
        return false;
    }
}

module.exports = {
    ConnectDB,
    InsertDocument,
    UpdateDocument,
    UpdateDocuments,
    FindDocuments,
    FindDocument,
    DeleteDocument,
    DeleteDocuments
}