



	//всплывающие подсказки
	$(document).ready(function(){
		$(".JScheckboxSecondPart[data-toggle='tooltip']").tooltip({
			placement: "top",
			title: "прыжок во второй половине программы",
			delay: { show: 300, hide: 500 }
		});
	});

	//функция свернуть-развернуть список
	$(document).ready(function(){
		$(".point_of_list, .sub_title").click(scroll_list);
	});
	function scroll_list(){
		var Iam = $(this).parent();
		Iam.parent().find(".wrap_list, .wrap_list_s").not(Iam.next()).hide(); //скрываем ненужные списки
		Iam.parent().find(".wrap_head").not(Iam).css({"background-color":"rgb(192,192,192)"}); //возвращаем цвет к исходному
		Iam.parent().find(".wrap_head_s").not(Iam).css({"background-color":""});							 //возвращаем цвет к исходному
		if (Iam.css("background-color") <= "rgb(171,130,255)" && Iam.hasClass("wrap_head")) { //возврат цвета при повторном нажатии для видимых заголовков (при закрытии списка)
				Iam.css({"background-color":"rgb(192,192,192)"});
		    } else if (Iam.css("background-color") <= "rgb(171,130,255)"){					  //возврат цвета при повторном нажатии для подзаголовков	(при закрытии списка)
				Iam.css({"background-color":""});
				} else {
		   	Iam.css({"background-color":"rgb(171,130,255)"})  //изменение цвета при открывании списка
		};
		Iam.next().toggle()
	}; //конец свернуть-развернуть
