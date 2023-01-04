import numpy as np
from typing import List

# Engine inputs to transformers are three lists of np.arrays representing
# the encoded input, the attention mask, and token types.
# Each of the np.arrays is of shape (batch, max_seq_len), so
# engine_inputs[0][0] gives the encodings of the first item in the batch.
# The number of non-zeros in this slice is the sequence length.
def sequence_length(engine_inputs: List[np.ndarray]):
  return np.count_nonzero(engine_inputs[0][0])