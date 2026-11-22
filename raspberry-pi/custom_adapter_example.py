"""Hardware adapter contract for a real, already-installed sensor driver.

DO NOT run as a sensor. Replace NotImplementedError with the actual driver,
calibration and conversion, and use a matching registered Sensor ID.
"""
class BearingAdapter:
    def __init__(self):
        # Initialize the physical driver using its actual vendor documentation.
        pass

    def read(self):
        # Real implementation must return calibrated values with documented units.
        # Example shape: {"vibrationRmsMmS": calibrated_mm_per_second}
        raise NotImplementedError('No physical sensor driver has been configured')
