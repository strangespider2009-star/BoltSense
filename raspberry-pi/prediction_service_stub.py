"""Future model service interface, intentionally not an AI prediction.

Replace with a trained, validated model with proper artifact versioning,
confidence/uncertainty calibration, and documented training data.
"""
def predict_remaining_useful_life(machine_id: str, component_id: str, readings: list[dict]) -> dict:
    return {
        'machineId': machine_id,
        'componentId': component_id,
        'modelVersion': None,
        'predictionAvailable': False,
        'failureProbability': None,
        'remainingUsefulLifeHours': None,
        'confidence': None,
        'reason': 'No trained/validated prediction model is configured.',
    }
