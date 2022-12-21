from deepsparse.logging import BaseLogger, MetricsCategories
from typing import Any, Optional

class CustomLogger(BaseLogger):
    def log(self, identifier: str, value: Any, category: Optional[str]=None):
        """
        :param identifier: The name of the item that is being logged.
            By default, in the simplest case, that would be a string in the form
            of "<pipeline_name>/<logging_target>"
            e.g. "image_classification/pipeline_inputs"
        :param value: The item that is logged along with the identifier
        :param category: The metric category that the log belongs to. 
            By default, we recommend sticking to our internal convention
            established in the MetricsCategories enum.
        """
        print(value)