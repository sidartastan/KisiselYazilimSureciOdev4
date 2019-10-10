/******************************************************************/
/* Program Assignment:  PSP1                                      */
/* Name:                Sidar Yuksel                              */
/* Date:                27/05/2019                                */
/* Description:         Lineer Regresyon Hesaplama                */
/******************************************************************/

const XLSX = require('xlsx');

// Excel dosyasini oku
const dataWB = XLSX.readFile('./odev4_data.xlsx');
const sheet = dataWB.Sheets[dataWB.SheetNames[0]];
const lastRow = parseInt(sheet['!ref'].split(':')[1].replace(/[A-Z]/g, ''));
console.log('LAST ROW:', lastRow);

//exceldeki verilerin atanacağı değişkenleri tanımla
const degisken = {
  'xTest1' : 0,
  'xTest2' : 0,
  'y' : 0
};

/*tüm değişkenlerin tek tek değerlerinin karelerinin veya çarpımlarının 
toplamının tutulduğu değişkenleri tanımla*/
const herBir = {
  'x1Kare' : 0,
  'x2Kare' : 0,
  'X1carpimY' : 0,
  'X2carpimY' : 0
};

//dosyadaki değerleri okuyup ilgili değişkenlerin değerlerini hesapla
for (let i = 2; i <= lastRow; i++) {
  const x1 = sheet['B' + i];
  const x2 = sheet['C' + i];
  const y = sheet['D' + i];

  //x ve y'nin degerlerinin tümünü topla
  degisken.xTest1 += x1.v;
  degisken.xTest2 += x2.v;
  degisken.y += y.v;
  //Test1 için x'in karesini hesapla
  herBir.x1Kare += x1.v * x1.v;
  //Test1 için x'in karesini hesapla
  herBir.x2Kare += x2.v * x2.v;
  //Test1 için x ve y'nin çarpımlarının toplamını hesapla
  herBir.X1carpimY += x1.v * y.v;
  //Test2 için x ve y'nin çarpımlarının toplamını hesapla
  herBir.X2carpimY += x2.v * y.v;
}

//yukarıda hesaplanan değerleri console da yazdır
console.log('Test1 x toplam değeri : ' + degisken.xTest1);
console.log("Test1 x'in karesinin toplam değeri : " + herBir.x1Kare);
console.log("Test1 x ve y carpimlarinin toplam değeri : " + herBir.X1carpimY);
console.log('Test1-2 y toplamdeğeri : ' + degisken.y);
console.log('Test2 x toplamdeğeri : ' + degisken.xTest2);
console.log("Test2 x'in karesinin toplam değeri : " + herBir.x2Kare);
console.log("Test2 x ve y carpimlarinin toplam değeri : " + herBir.X2carpimY);

//ortalamaların alındığı değişkenleri tanımla
const ortalama = {
  'x1' : 0,
  'x2' : 0,
  'y' : 0
};

//ortalamaları hesapla
ortalama.x1 = degisken.xTest1/10;
ortalama.x2 = degisken.xTest2/10;
ortalama.y = degisken.y/10;

//Test1 için beta0 ve beta1 değişkenleri
const betaTest1 = {
  'beta0' : 0,
  'beta1' : 0
};

//Test2 için beta0 ve beta1 değişkenleri
const betaTest2 = {
  'beta0' : 0,
  'beta1' : 0
};

//Test1 beta0 ve beta1 degerlerini hesapla
betaTest1.beta1 = (herBir.X1carpimY-10*ortalama.x1*ortalama.y) / (herBir.x1Kare-10*Math.pow(ortalama.x1, 2));
betaTest1.beta0 = ortalama.y-betaTest1.beta1*ortalama.x1;
console.log('Test1 beta0 degeri: ', betaTest1.beta0);
console.log('Test1 beta1 degeri: ', betaTest1.beta1);

//Test2 beta0 ve beta1 degerlerini hesapla
betaTest2.beta1 = (herBir.X2carpimY-10*ortalama.x2*ortalama.y) / (herBir.x2Kare-10*Math.pow(ortalama.x2, 2));
betaTest2.beta0 = ortalama.y-betaTest2.beta1*ortalama.x2;
console.log('Test2 beta0 degeri: ', betaTest2.beta0);
console.log('Test2 beta1 degeri: ', betaTest2.beta1);


//Test3 için beta0 ve beta1 değişkenleri
const betaTest3 = {
  'beta0' : 0,
  'expectedBeta0' : 0,
  'beta1' : 0,
  'expectedBeta1' : 1.56
};

const odev4A = {
  'x' : 0,
  'y' : 0,
  'ortalamaX' : 0,
  'ortalamaY' : 0,
  'xKare' : 0,
  'XcarpimY' : 0,
  'n' : 2
};

//Test3 için verilerin olduğu Excel dosyasini oku
const dataWB2 = XLSX.readFile('./odev4_LOC.xlsx');
const sheet_odev4A = dataWB2.Sheets[dataWB2.SheetNames[0]];
const lastRow_odev4A = parseInt(sheet_odev4A['!ref'].split(':')[1].replace(/[A-Z]/g, ''));
console.log('LAST ROW:', lastRow_odev4A);

//Test3 için X ve Y toplamları, ve Xkare ve XcarpimY degerlerinin toplamını hesapla
for (let i = 2; i <= lastRow_odev4A; i++) {
  const x = sheet_odev4A['B' + i];
  const y = sheet_odev4A['C' + i];

  //x ve y'nin degerlerinin tümünü topla
  odev4A.x += x.v;
  odev4A.y += y.v;
  //Test3 için x'in karesini hesapla
  odev4A.xKare += x.v * x.v;
  //Test3 için x ve y'nin çarpımlarının toplamını hesapla
  odev4A.XcarpimY += x.v * y.v;
}

//Test3 için X ve Y ortalama değerlerihesapla
odev4A.ortalamaX = odev4A.x/odev4A.n;
odev4A.ortalamaY = odev4A.y/odev4A.n;

//Test3 Expected beta0 ve beta1 degerlerini hesapla
betaTest3.expectedBeta0 = odev4A.ortalamaY-betaTest3.expectedBeta1*odev4A.ortalamaX;
console.log('Test3 expected beta0 degeri: ', betaTest3.expectedBeta0);
console.log('Test3 expected beta1 degeri: ', betaTest3.expectedBeta1);


//Test3 Actual beta0 ve beta1 degerlerini hesapla
betaTest3.beta1 = (odev4A.XcarpimY-odev4A.n*odev4A.ortalamaX*odev4A.ortalamaY) / (odev4A.xKare-odev4A.n*Math.pow(odev4A.ortalamaX, 2));
betaTest3.beta0 = odev4A.ortalamaY-betaTest3.beta1*odev4A.ortalamaX;
console.log('Test3 actual beta0 degeri: ', betaTest3.beta0);
console.log('Test3 actual beta1 degeri: ', betaTest3.beta1);

// Yeni bir excel dosyasi olusturup verileri içerisine yaz
const wb = XLSX.utils.book_new();
wb.SheetNames.push('ResultData');
const wsData1 = [['TEST',' Expected Results', '','Actual Result','']];
const baslik = ['','B0', 'B1', 'B0', 'B1'];
const test1Sonuc = ['1', '-22,55', '17,279', betaTest1.beta0, betaTest1.beta1]; 
const test2Sonuc = ['2', '-23,92', '14,310', betaTest2.beta0, betaTest2.beta1];
const test3Sonuc = ['3', betaTest3.expectedBeta0, betaTest3.expectedBeta1, betaTest3.beta0, betaTest3.beta1];
wsData1.push(baslik);
wsData1.push(test1Sonuc);
wsData1.push(test2Sonuc);
wsData1.push(test3Sonuc);

const ws = XLSX.utils.aoa_to_sheet(wsData1);
wb.Sheets['ResultData'] = ws;
XLSX.writeFile(wb, './lineer_regresyon_hesaplama.xlsx', {bookType:'xlsx', bookSST:true, type: 'binary'});
console.log("\nSatır sayısı hesaplaması bitti. Sonuçları görmek için Mantiksal_Satir_Sayisi_Hesaplama.xlsx excel dosyasına bakınız!!!\n");