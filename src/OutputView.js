import { Console } from '@woowacourse/mission-utils';
import { menuName } from "./App.js";

const OutputView = {
    printMenu(orderList, dateInput, date) {
        let totalPrice = this.calculationOfPrice(orderList);
        let totalDiscount = 0;

        Console.print("<주문 메뉴>");
        orderList.forEach(({ menu, count }) => {
            Console.print(`${menu} ${count}개\n`);
        });

        Console.print("\n<할인 전 총주문 금액>\n");
        Console.print(`${totalPrice}원\n`);

        let champagne = 0;
        Console.print("\n<증정 메뉴>\n");
        if (totalPrice >= 120000) {
            Console.print("샴페인 1개\n");
            champagne = -25000;
        } else {
            Console.print("없음\n");
        }

        Console.print("\n<혜택 내역>\n");
        let eventDiscount = 0, desertDiscount = 0, mainDiscount = 0, specialDiscount = 0;
        if (totalPrice >= 10000) {
            ({ eventDiscount, desertDiscount, mainDiscount, specialDiscount } =
                this.eventPrivilege(orderList, dateInput, date));
        }

        const discounts = [
            { label: "크리스마스 디데이 할인", amount: eventDiscount },
            { label: "평일 할인", amount: desertDiscount },
            { label: "주말 할인", amount: mainDiscount },
            { label: "특별 할인", amount: specialDiscount },
            { label: "증정 이벤트", amount: champagne }
        ];

        const totalDiscounts = [eventDiscount, desertDiscount, mainDiscount, specialDiscount, champagne];
        const hasDiscount = totalDiscounts.some(discount => discount < 0);

        if (hasDiscount) {
            discounts.forEach(({ label, amount }) => {
                if (amount < 0) {
                    Console.print(`${label}: ${amount}원\n`);
                    totalDiscount += amount;
                }
            });
        } else {
            Console.print("없음\n");
        }

        const finalPrice = totalPrice + totalDiscount;

        Console.print("\n<총혜택 금액>\n");
        Console.print(`${-totalDiscount}원\n`);
        Console.print("\n<할인 후 예상 결제 금액>\n");
        Console.print(`${finalPrice}원\n`);

        let badge = "없음";
        if (totalDiscount <= -20000) {
            badge = "산타";
        } else if (totalDiscount <= -10000) {
            badge = "트리";
        } else if (totalDiscount <= -5000) {
            badge = "별";
        }

        Console.print("\n<12월 이벤트 배지>\n");
        Console.print(`${badge}\n`);
    },

    calculationOfPrice(orderList) {
        let price = 0;
        orderList.forEach(({ menu, count }) => {
            for (const category in menuName) {
                if (menuName[category][menu] !== undefined) {
                    price += menuName[category][menu] * count;
                    break;
                }
            }
        });
        return price;
    },

    eventPrivilege(orderList, dateInput, date) {
        let eventDiscount = 0;
        if (dateInput <= 25) {
            eventDiscount = -(1000 + 100 * (dateInput - 1));
        }

        let desertDiscount = 0;
        let mainDiscount = 0;
        if (date >= 0 && date <= 4) {
            orderList.forEach(({ menu }) => {
                if (menuName["디저트"]?.[menu] !== undefined) {
                    desertDiscount -= 2023;
                }
            });
        } else if (date === 5 || date === 6) {
            orderList.forEach(({ menu }) => {
                if (menuName["메인"]?.[menu] !== undefined) {
                    mainDiscount -= 2023;
                }
            });
        }

        let specialDiscount = 0;
        if (date === 0 || dateInput === 25) {
            specialDiscount = -1000;
        }

        return {
            eventDiscount,
            desertDiscount,
            mainDiscount,
            specialDiscount
        };
    }
};

export default OutputView;