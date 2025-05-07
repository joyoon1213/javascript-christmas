import { Console } from '@woowacourse/mission-utils';
import { menuName } from "./App.js";

const InputView = {
    async readDate() {
      const dateInput = await Console.readLineAsync("12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)");
      if (isNaN(Number(dateInput))) {
        throw new Error("[ERROR] 날짜는 숫자로만 입력 가능합니다\n");
      }
      const date = new Date(2023,11,Number(dateInput));
      return {dateInput: Number(dateInput), date };
    },
    async readMenuAndNum() {
      const menuInput = await Console.readLineAsync("주문하실 메뉴와 개수를 알려주세요. (e.g. 해산물파스타-2, 레드와인-1, 초코케이크-1)");

      let value = 0;
      let totalCount = 0;
      const orders = [];
      let found = false;

      const orderList = menuInput.split(",");

      orderList.forEach(function(list) {
        const [menu, countStr] = list.split("-");
        const count = Number(countStr);

        if (isNaN(count) || count <= 0) {
          throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.\n");
        }
        for (const category in menuName) {
          if (menuName[category][menu] !== undefined) {
            if ( category !== "음료") {
              value++;
            }
          found = true;
          }
        }


        orders.push({menu, count });
        totalCount += count;
      });

      if (value === 0) {
        throw new Error("[ERROR] 음료만 주문할 수 없습니다.\n");
      }
      if (totalCount > 20) {
        throw new Error("[ERROR] 음식은 20개까지만 주문 가능합니다.\n");
      }

      if (!found) {
        throw new Error("[ERROR] 유효하지 않은 메뉴입니다. 다시 입력해 주세요.\n");
      }

      return orders;
    }
};

export default InputView;