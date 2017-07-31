
// Объединяет функции слева направо, включена в Redux для удобства.
function compose(f1, f2) {
  return function (x) {
    return f1(f2(x));
  };
}

const fn = compose(x => x + 5, x => x * 8);

const result = fn(2);

console.log(result);
