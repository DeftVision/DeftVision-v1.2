const documentModel = require('../models/documentModel');

exports.getDocuments = async (req, res) => {
    try {
        const documents = await documentModel.find({});
        if (!documents) {
            return res.status(400).send({
                message: "Documents not found"
            })
        }
        if (documents) {
            return res.status(200).send({
                document_count: documents.length,
                documents,
            })

        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "get documents callback error",
            error: error,
        })
    }
}

exports.getDocument = async (req, res) => {
    try {
        const {id} = req.params;
        const document = await documentModel.findById(id);
        if (!document) {
            return res.status(400).send({
                message: "Document not found",
            })
        }
        if (document) {
            return res.status(200).send({
                document,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "getting document callback error",
            error: error,
        })
    }
}

exports.newDocument = async (req, res) => {
    try {
        const {title, category, downloadUrl, uniqueFileName} = req.body;
        if (!title || !category || !downloadUrl || !uniqueFileName) {
            return res.status(400).send({
                message: "All fields are required"
            })
        }
        const document = new documentModel({title, category, downloadUrl, uniqueFileName});
        await document.save();
        return res.status(200).send({
            message: "File uploaded successfully",
            document,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "creating document callback error",
            error: error,
        })
    }

}

exports.updateDocument = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, category, downloadUrl, uniqueFileName} = req.body;
        const document = await documentModel.findByIdAndUpdate(id, req.body, {new: true});
        if (!document) {
            return res.status(400).send({
                message: "File wasn't saved"
            })
        }
        if (document) {
            return res.status(200).send({
                message: "File was saved successfully.",
                document,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "updating document callback error",
            error: error,
        })
    }
}

exports.deleteDocument = async (req, res) => {
    try {
        const {id} = req.params;
        const document = await documentModel.findByIdAndDelete(id);
        if (document) {
            return res.status(200).send({
                message: "File was deleted successfully",
            })
        } else {
            return res.status(400).send({
                message: "Deleting file failed."
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "deleting document callback error",
            error: error,
        })
    }
}
