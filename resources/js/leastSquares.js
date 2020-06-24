export default function (X, Y) {
 let ret = {}

 var sumX = 0
 var sumY = 0
 var sumXY = 0
 var sumXSq = 0
 var N = X.length

 for (var i = 0; i < N; ++i) {
   sumX += X[i]
   sumY += Y[i]
   sumXY += X[i] * Y[i]
   sumXSq += X[i] * X[i]
 }

 ret.m = ((sumXY - sumX * sumY / N)) / (sumXSq - sumX * sumX / N)
 ret.b = sumY / N - ret.m * sumX / N

 if (true) {
   var varSum = 0
   for (var j = 0; j < N; ++j) {
     varSum += (Y[j] - ret.b - ret.m * X[j]) * (Y[j] - ret.b - ret.m * X[j])
   }

   var delta = N * sumXSq - sumX * sumX
   var vari = 1.0 / (N - 2.0) * varSum

   ret.bErr = Math.sqrt(vari / delta * sumXSq)
   ret.mErr = Math.sqrt(N / delta * vari)
 }

 ret.calculate = function (x) {
   return this.m * x + this.b
 }
 ret.toString = function () {
   return `y=${this.m.toFixed(2)}*x+${this.b.toFixed(2)}`
 }
 
 return ret;
}