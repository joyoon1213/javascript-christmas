import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class App {
  async run() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n");
    const { dateInput, date } = await InputView.readDate();
    const orderList = await InputView.readMenuAndNum();
    Console.print(`12월 ${dateInput}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n\n`);
    OutputView.printMenu(orderList, dateInput, date);
  }
}

export const menuName = {
  애피타이저: {
    양송이수프: 6000,
    타파스: 5500,
    시저샐러드: 8000
  },
  메인: {
    티본스테이크: 55000,
    바비큐립: 54000,
    해산물파스타: 35000,
    크리스마스파스타: 25000
  },
  디저트: {
    초코케이크: 15000,
    아이스크림: 5000
  },
  음료: {
    제로콜라: 3000,
    레드와인: 60000,
    샴페인: 25000
  }
};

export default App;
