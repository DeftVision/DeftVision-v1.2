const evaluationModel = require("../models/evaluationModel");
const documentModel = require("../models/documentModel");



exports.getEvaluations = async (req, res) => {
    try {
        const evaluations = await evaluationModel.find({});
        if (!evaluations) {
            return res.status(400).send({
                message: 'No evaluations found',
            })
        }
        if(evaluations) {}
        return res.status(200).send({
            evaluation_count: evaluations.length,
            evaluations: evaluations,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'getting all evaluation callback error',
            error: error
        })
    }
}

exports.getEvaluation = async (req, res) => {
    try {
        const {id} = req.params;
        const evaluation = await evaluationModel.findById(id);
        if (!evaluation) {
            return res.status(404).send({
                message: 'Evaluation not found',
            })
        }
        if(evaluation) {
            return res.status(200).send({
                evaluation,
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'getting an evaluation callback error',
            error: error
        })
    }
}

exports.newEvaluation = async (req, res) => {
    try {
        const {visitDateTime, location, evaluator, cashier, greeting, repeatOrder, upsell, patio, wait, foodScore, appearanceScore, serviceScore, uniqueFileName, downloadUrl, identifyManager, comments} = req.body;
        if(!visitDateTime || !evaluator || !location || !cashier || !wait || !foodScore || !appearanceScore || !serviceScore || !uniqueFileName || !downloadUrl || !comments) {
            return res.status(400).send({
                message: 'Complete required fields',
            })
        }

        const evaluation = new evaluationModel({visitDateTime, location, evaluator, cashier, greeting, repeatOrder, upsell, patio, wait, foodScore, appearanceScore, serviceScore, uniqueFileName, downloadUrl, identifyManager, comments});
        await evaluation.save();
        return res.status(200).send({
            message: 'Evaluation was saved successfully',
            evaluation,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'creating evaluation callback error',
            error: error
        })
    }
}

exports.updateEvaluation = async (req, res) => {
    try {
        const {id} = req.params;
        const {visitDateTime, location, evaluator, cashier, greeting, repeatOrder, upsell, patio, wait, foodScore, appearanceScore, serviceScore, uniqueFileName, downloadUrl, identifyManager, comments} = req.body;
        const evaluation = await evaluationModel.findByIdAndUpdate(id, req.body, {new: true});
        if (!evaluation) {
            return res.status(400).send({
                message: "Evaluation wasn't saved" ,
            })
        } else {
            return res.status(200).send({
                message: 'Evaluation was saved successfully',
                evaluation,
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'updating evaluation callback error',
            error: error
        })
    }
}

exports.deleteEvaluation = async (req, res) => {
    try {
        const {id} = req.params;
        const evaluation = await evaluationModel.findByIdAndDelete(id);
        if (evaluation) {
            return res.status(200).send({
                message: "Evaluation was deleted successfully",
            })
        } else {
            return res.status(400).send({
                message: "Deleting evaluation failed"
            })
        }
    }
    catch (error) {
        return res.status(500).send({
            message: 'delete evaluation callback error',
            error: error
        })
    }
}