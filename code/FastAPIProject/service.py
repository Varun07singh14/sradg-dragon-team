import io

import pandas as pd
from data_processing.process_data import  DataProcessing
from model.autoencoder_model.autoencoder import Autoencoder


def train(file_path="data/train_data.csv"):
    pass
def __save_file(data_frame,anomaly_score,file_path):
    buffer = io.StringIO()
    data_frame['ANOMALY'] = anomaly_score
    data_frame.to_csv(buffer,index=False)
    buffer.seek(0)
    return buffer

def predict(file_path):
    data_processing = DataProcessing(file_path)
    df = data_processing.get_data_frame()
    x_test,y_test = data_processing.process_data_cleanup(columns=['As of Date', 'Primary Account', 'Secondary Account','Comments','ANOMALY'])
    model = Autoencoder(model=None)
    anomaly_col = model.predict(x_test,y_test)
    csv_value = __save_file(df,anomaly_col,file_path)
    return csv_value

