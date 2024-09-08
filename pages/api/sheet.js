import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const privateKey=`-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCXzjQINid/PaC
dp6KM4Cc1o/Sm9xqjUdLQu6M3AXWsjFy0GZRWwgH7IGe8BD0buow6ZcaIbx3bjwW
InEMx5khTIGSfmWgugPJrGyIRh4xv861z8DTMYyNc4R9B8beo+HqRpCYhwM1fa8V
DyobRvyQVviKyp7/Iy5Dctf6xonfigOyOZ7Q4g1LnOhDXgAIXBk4ZgdOvU8/jvR5
nFyzTkUO/LBYppIrXaVDGGV5SIBqiabCjY3OYpIqZHJCSIzLWQ5M1jbwgsolnIpK
/5bZ5noeTZ5GnuuXNssqiz7kdt2mo2k5D3OIi9IjZPdK9MNDy5tQS7ydtUdjSO9k
ePlq+nqlAgMBAAECggEAAcYTdQlt60nVD5ucSG4FVQyfFtCl2xyfDDXUiq6jjBy8
88f+S3s1dbgpoRieSovakV0kyJOKysziALXt3IGa5aFk7tywFmWsKYJ6d0rHoBeY
uM92XdcDovMJo8DlIvkYqNfPrIrgM3RDG3qzjvGcK2sHwmFeMi8RDy27uZsuUltF
7+6LTxQ4kxtvqJtfTNMjveXwxH7GYFHTIpCZWrAP0lHQN8sw3rBTHBi1Sp7hOVml
f18nH6qohIMKVw2uOJ7qFSfZ7gx7/81KEORqQ27MQoOLphXYknZ83MrlDavRDZ7N
CqZd18PI5UiKWO32+hVuwgRAE18lAIS8VRW2Zscf/wKBgQDm+lT/ztKE2FQwYeu3
B4XdKzkr6NFWj8wmKmxsCzxVuah3nYx9UK8pWGUJrdu4+QcFcLuXS4Y3xTlwsS2G
76QON/YiVRBBBo5iYlb99BOtmHH/wEjwgvDREiHtZ2MjmgDDj/sFFUcvYd6C9STx
MEHdPpaDZRLd9Y48ki0tJA/dvwKBgQDXbbR7HiIKP3wjL1Cy7wDYUo+SRqfY09Ja
qcNeL9i8+Abe115hky9FlnOypNm82459l9Z1oBXlIXaMtyt07Zp+KTZeOkrHBN45
DGKpqC5kLp5EPpdt7VGPxTwtUEg72Rfvl5e6a9FTUqOZ6/Lp3DD9NH7kfFbRu46g
EF5UPF7ImwKBgQCc+ezinbE9T7iH2UTVc2tq0IFecjAzYC8ikRp2o3wx1qfEA3MD
h95DfyvL1DjMEZLQA7m6LT3ekU9kY0XJuvwIHchNtPoC9221N5hfp43oIP75DbmE
m7kGnggozGb4PyXdwvCal8d1UFJlNi4RLPbWYj7wtbSI3OX6DG5fi26tCQKBgGb1
nZ6CBk7TjKbcRDtgkwzQWKHWdv3gLtb578+iGnomKFJ0qD0GNT+S6nTk6NOkM3O/
D9ZjzlMWLSyPlotpy76kP8HFJlv77aFiU/01zgY/aZDAQWteUu7dmyclCYDg/tmZ
oACO6xphkqNL62rtu9QoNMVKz8upUj8Z05t6xuolAoGBAL4Y8GEU9/+mwjn6NSF3
Tsl1y3lFhbrnGLrgAkQGhMDUMUPBK/Mr9njjmTRzQtqwm+Rr4syVaANBFGF+IxVY
zMz9AVoFltf1W48l0+MkYMce7M/UhnfyR3zxQRn3kCGd7pF1lSgO8jQaAbvr4B6l
iPoBbFasPUdlT6bvsU8BHyvj
-----END PRIVATE KEY-----`;


  const {name, email } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        private_key: privateKey.replace(/\\n/g, '\n'),
        
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID, 
      range: 'Sheet1!A2:A',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name,email]],
      },
    });

    res.status(200).json({ message: 'Email added successfully', response });
  } catch (error) {
    console.error('Error adding email to sheet:', error);
    res.status(500).json({ message: 'Error adding email to sheet', error: error.message });
  }
}