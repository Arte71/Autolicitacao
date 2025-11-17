import camelot
import pandas as pd

dataframes = []

def extrairTexto(pdf_path):
    tables = camelot.read_pdf(pdf_path, pages='2', flavor='lattice', suppress_stdout='false', strip_text='\n')
    for table in tables:
        print('Stream Tables:')
        print(table.df)
        dataframes.append(table.df)
    ds = pd.DataFrame(dataframes[0])
    ds.to_csv('teste.csv', index=False)
    return dataframes

if __name__ == "__main__":
    pdf_path = 'PDFTeste.pdf'
    extrairTexto(pdf_path)