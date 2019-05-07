
	//СКРИПТЫ ВСПЛЫВАЮЩЕГО ОКНА

	//---------------мониторинг изменения значения селекта для блокировки/разблокировки селектов------------
	$(document).ready(function(){
		var Iam
		var value_of_selected
		$("div.JSmodalWindow select").not(".JSSecondarySelect").change (function(){
			Iam=$(this);
			value_of_selected=Iam.val();
			if (value_of_selected==0){
				LockNextSelect(Iam)
				LockAllSelect(Iam);
			} else {
				UnlockSelect(Iam);
			};
		});
	});//КОНЕЦ мониторинга

	//функция разблокировки следующего селекта
	function UnlockSelect(Iam){
		Iam.next().prop("disabled",false);
	};
	//функция блокировки и показ имени селектов в своем ряду
	function LockNextSelect(Iam){
		Iam.nextAll().prop("selectedIndex","0").prop("disabled",true);
		return;
	};

	//функция предотвращения ошибок ввода - блокировка селектов
	function LockAllSelect(Iam){
		var IamHere=Iam.parent().parent().parent().nextAll();
		Iam.parent().parent().next().prop("disabled",true);//блокировка кнопки "добавить прыжок" в текующем прыжковом поле
		IamHere.find("select").prop("selectedIndex","0");//показ имени селектов в следующем прыжковом поле
		IamHere.find(".disabled").prop("disabled",true); //блокировка в следующем прыжковом поле селектов и кнопки "добавить прыжок"
		IamHere.hide(".hide.contanerGrey"); //скрытие прыжкового поля
		return;
	};//КОНЕЦ функции предотвращения

		//функция "сброс"
	function ResetSelect(Iam_button){
		Iam_button.find(".hide").hide();
		Iam_button.find("select").prop("selectedIndex","0");
		Iam_button.find(".disabled").prop("disabled",true);
		Iam_button.find(".outputTitle_NameOfElement, .outputTitle").text("");
		Iam_button.find(".outputTitle_ValueOfElement, .outputValueOfElement").text("0.00");
		return;
	};//КОНЕЦ функции "сброс"


	//БЛОК ПОВЕДЕНИЯ КНОПОК
	$(document).ready(function(){

		var Iam_button

		//----------установка свойства "disabled" и "hide"-------------
		AddHideAndDisabled();
		function AddHideAndDisabled(){
			$(".disabled").prop("disabled",true);
			$(".hide").hide();
		};//КОНЕЦ установки свойства "disabled"


		//--------------мониторинг кнопки "прыжки"----------------
		$(".JSbuttonJumps").click(function(){
			Iam_button=$(this).parent().parent();
			ResetSelect(Iam_button);
			Iam_button.find(".JSjumps").show();
			Iam_button.find(".outputTitle").text("прыжковый элемент")
		});//КОНЕЦ мониторинга "прыжки"

		//---------мониторинг кнопки "вращения"----------------
		$(".JSbuttonSpins").click(function(){
			Iam_button=$(this).parent().parent();
			ResetSelect(Iam_button);
			Iam_button.find(".JSspins").show();
			Iam_button.find(".outputTitle").text("вращение")
		});

		//--------------мониторинг кнопки "дорожки"----------------
		$(".JSbuttonSteps").click(function(){
			Iam_button=$(this).parent().parent();
			ResetSelect(Iam_button);
			Iam_button.find(".JSsteps").show();
			Iam_button.find(".outputTitle").text("дорожка")
		});//КОНЕЦ мониторинга "дорожки"

		//---------------------мониторинг кнопки "сброс"-------------------------
		$(".JSbuttonReset_Modal").click(function(){
			Iam_button=$(this).parent().parent();
			ResetSelect(Iam_button);
		});//КОНЕЦ мониторинга "сброс"


		//---------разблокировка кнопки "добавить прыжок"
		$(".unlockBtnAddJump").change(function(){
			let Iam_btn_add_jump=$(this);
			let value_of_selected=Iam_btn_add_jump.val();
			if (value_of_selected!=0){
				Iam_btn_add_jump.parent().parent().next().prop("disabled", false);
			};
		}); //КОНЕЦ разблокировки

		//-------------------работа кнопки "добавить прыжок"-----------------
		$(".buttonAddJump").click(function(){
			$(this).parent().next().show()
		});//КОНЕЦ "добавить прыжок"

		//--------------мониторинг изменения значения селектов для показа имени
		$("div.contanerGrey select").change(function(){
			let Iam_select=$(this);
			let value_of_selected=Iam_select.val();
			if (value_of_selected==0){
				ShowNameOfSelect(Iam_select);
			};
		});//КОНЕЦ мониторинга для показа имени

		//функция показа имени селекта
		function ShowNameOfSelect(Iam_select){Iam_select.prop("selectedIndex","0")};
	});//----------------------------КОНЕЦ блока поведения кнопок


	//БЛОК СЕЛЕКТА С ДОРОЖКАМИ
	$(document).ready(function(){
		$(".JSselectStep").change(function(){
			value_of_selected=$(this).val();
			if (value_of_selected==="ChSq"){
				$(this).next().prop("selectedIndex", "3").prop("disabled", true);
			};
		});
	});//КОНЕЦ блока с дорожками


	//БЛОК РАБОТЫ С ТРЕТЬИМ ПРЫЖКОМ В КАСКАДЕ
	$(document).ready(function(){
		//--------------мониторинг изменения значения селекта для формирования списка возможного третьего прыжка в каскаде-------------
		$(".JSSelectChanger").change(function(){
			var Iam=$(this);
			let Iam_SelectFloat=Iam.parent().parent().parent().next().find(".JSSelectFloatOptions");
			let value_of_selected=Iam.val();
			if (value_of_selected==="A"){
				LockAllSelect(Iam)
				Iam.prev().prop("disabled",false);
			} else if (value_of_selected==="Eu"){
				AddOptionsForEu(Iam, Iam_SelectFloat)
			} else {AddOptionsForLoT(Iam, Iam_SelectFloat)};
		});//КОНЕЦ мониторинга для определения третьего прыжка

		//функция изменения options в третьем прыжке каскада для оллера
		function AddOptionsForEu(Iam, Iam_SelectFloat){
			Iam.prev().prop("selectedIndex","2").prop("disabled",true);
			ShowNamesThirdRow(Iam_SelectFloat);
			$.each(arrOptionsForEu, function(value, key){
				Iam_SelectFloat.append('<option value="'+value+'">'+key+'</option>')
			});//КОНЕЦ each()
		};//КОНЕЦ AddOptionsForEu(Iam)

		//функция изменения options в третьем прыжке каскада для тулупа и ритбергера
		function AddOptionsForLoT(Iam, Iam_SelectFloat){
			Iam.prev().prop("disabled",false)
			ShowNamesThirdRow(Iam_SelectFloat);
			$.each(arrOptionsForLoT, function(value, key){
				Iam_SelectFloat.append('<option value="'+value+'">'+key+'</option>')
			});//КОНЕЦ each()
		};//КОНЕЦ AddOptionsForLoT(Iam)

		//показ имени селектов в третьем ряду, сброс выпадающего списка в селекте "прыжки"
		function ShowNamesThirdRow(Iam_SelectFloat){
			Iam_SelectFloat.find("option").not("option[value=0]").remove();
			Iam_SelectFloat.parent().find("select").prop("selectedIndex", "0")
			return
		};// КОНЕЦ показа имени селектов в третьем ряду
	});//КОНЕЦ блока работы с третьим прыжком в каскаде


	//БЛОК СЕЛЕКТА С Е и V
	$(document).ready(function(){
		$(".JSNeedAdditionalSelect").change(function(){
			Iam_need_e=$(this);
			let value_of_selected=Iam_need_e.val();
			CheckForAdditionalSelect(value_of_selected);
			if (CheckForAdditionalSelect(value_of_selected)){
				Iam_need_e.parent().find("select").last().show().css("color","#999").prop("selectedIndex", "0");
			} else{Iam_need_e.parent().find("select").last().prop("selectedIndex", "0").hide()};
		});
		$(".JSselectAdditional").change(function(){
			Iam_e=$(this);
			let value_of_selected=Iam_e.val();
			if (value_of_selected==0||value_of_selected==null){
				Iam_e.css("color","#999");
			}else{Iam_e.css("color","#333")}
		});

		function CheckForAdditionalSelect(value_of_selected){
			for (let i=0; i<arrForAdditionalSelect.length; i++){
				if (arrForAdditionalSelect[i]===value_of_selected){
					return true
				};
			};
			return false
		};
	});//КОНЕЦ блока с Е и V
	//КОНЕЦ скриптов всплывающего окна





	//СКРИПТЫ СВЯЗИ С ВСПЛЫВАЮЩИМ ОКНОМ (с вычислительной частью)
	$(document).ready(function(){

		var ID_greyStripe_forCounting;
		var arrValueAndNameOfElement={};
		var name_of_property_for_main_counting;
		var value_of_property_for_main_counting;
		var Iam_click_in_main_window_forCounting;

		//переменные для Calculation()
		var arrOfItems=[];
		var item;
		var itemLow;
		var score;
		var score_sub;
		var option_of_select;
		var Iam;
		var Iam_for_Calculation;

		//-----------мониторинг поля для вызова всплывающего окна
		$(".contanerTransparent").click(function(event){
			Iam_click_in_main_window_forCounting=$(this);
			GetID();
			$("#windowElement").modal();
		});//КОНЕЦ мониторинга поля для вызова всплывающего окна

		function GetID(){
			ID_greyStripe_forCounting=Iam_click_in_main_window_forCounting.closest(".greyStripe").attr("id");
			return;
		};

		//-----------мониторинг селектов----------
		$("div.JSmodalWindow select").change(function(){
			Iam_for_Calculation=$(this).parent().parent().parent().parent();
			DirectorModalWindow();
		});//КОНЕЦ мониторинга селектов

		function DirectorModalWindow(){
			Calculation();
			ShowItemAndScoreInPopup();
		};

		//мониторинг кнопки "сохранить"
		$(".buttonSave").click(function(){DirectorBetweenMainAndModalWindow()});
		//мониторинг кнопки "сброс"
		$(".JSbuttonReset_Modal").click(function(){DirectorBetweenMainAndModalWindow()});

		function DirectorBetweenMainAndModalWindow(){
			Calculation();
			PushInto_arrValueAndNameOfElement();
			PrintIn();
			ResetVar();
		};

		//функция формирования объекта arrValueAndNameOfElement с названием элемента и его стоимостью
		function PushInto_arrValueAndNameOfElement(){
			MakeTheName();
			arrValueAndNameOfElement[name_of_property_for_main_counting]=arrOfItems.join("");
			arrValueAndNameOfElement[value_of_property_for_main_counting]=score_sub;
			return;
		};

		//функция формирования имени свойства объекта arrValueAndNameOfElement
		function MakeTheName(){
			name_of_property_for_main_counting=ID_greyStripe_forCounting;
			name_of_property_for_main_counting=name_of_property_for_main_counting+"name";
			value_of_property_for_main_counting=ID_greyStripe_forCounting;
			value_of_property_for_main_counting=value_of_property_for_main_counting+"value";
			return;
		};

		//функция вывода названия элемента и стоимости на главную страницу
		function PrintIn(){
			$("#"+ID_greyStripe_forCounting).find(".JSoutputTransparent_NameOfElement").text(arrValueAndNameOfElement[name_of_property_for_main_counting]);
			$("#"+ID_greyStripe_forCounting).find(".JSoutputTransparent_ValueOfElement").text(arrValueAndNameOfElement[value_of_property_for_main_counting].toFixed(2));
			return;
		};

		//функция сброса переменных
		function ResetVar(){
			ID_greyStripe_forCounting=null;
			CleanUp_arrOfItems();
			item="";
			score=0;
			score_sub=0;
			Iam=null;
			return;
		};

		//функция очистки массива набранных элементов в всплывающем окне
		function CleanUp_arrOfItems(){
			arrOfItems.splice(0, arrOfItems.length);
			return
		};//КОНЕЦ CleanUp_arrOfItems


		//ВЫЧИСЛИТЕЛЬНАЯ ЧАСТЬ
		//----------------функция подсчета--------------
		function Calculation(){

			score_sub=0;
			CleanUp_arrOfItems(arrOfItems);
			if(Iam_for_Calculation==undefined){return};

			//цикл проверки всех селектов
			Iam_for_Calculation.find(".contanerGrey").each(function(index){
				item="";
				score=0;
				$(this).find("select").each(function(){//цикл проверки селектов одного прыжка
					Iam=$(this);
					option_of_select=Iam.val();
					if (option_of_select==null || option_of_select==0){
						option_of_select="";
					};
					item=item+option_of_select;
				});//конец цикла проверки селектов одного прыжка

				itemLow = item.toLowerCase();
				score=list_value[itemLow];
				if (score==undefined){
					score=0;
					item=null;
				};

				score_sub=score_sub+score;

				if (index==1 && item!=null){ // отсчет второго элемента для комбинации прыжков
					CheckAxels(itemLow);
					if (CheckAxels(itemLow)){
						score_sub=score_sub*0.8;
						item=item+"+SEQ";
					};
				};//КОНЕЦ отсчет второго элемента для комбинации прыжков

				//отсчет второго и третьего прыжка для каскадов
				if (index>=1 && item!=null){item="+"+item};

				if(item!=null){arrOfItems.push(item)};
				Iam.parent().parent().find("output").text(score.toFixed(2));
			});//КОНЕЦ цикла проверки всех селектов
			return;
		};//КОНЕЦ Calculation()

		//функция вывода названия элемента и его стоимости в вверхнюю строчку всплывающего окна
		function ShowItemAndScoreInPopup(){
			Iam_for_Calculation.parent().find(".outputTitle_NameOfElement").text(arrOfItems.join(""));
			Iam_for_Calculation.parent().find(".outputTitle_ValueOfElement").text(score_sub.toFixed(2));
			return;
		};//КОНЕЦ ShowItemAndScoreInPopup()

		//функция проверки второго элемента - является ли он акселем
		function CheckAxels(itemLow){
			for (let i=0; i<arrOfAxels.length; i++){
				if(arrOfAxels[i]===itemLow){
				return true;
				};
			};
			return false;
		};//КОНЕЦ CheckAxels(itemLow)

		//КОНЕЦ БЛОКА ВЫЧИСЛИТЕЛЬНОЙ ЧАСТИ----------------------------
	});//КОНЕЦ СКРИПТОВ СВЯЗИ С ВСПЛЫВАЮЩИМ ОКНОМ (с вычислительной частью)



	//БЛОК ЗАПОМИНАНИЯ ВЫБОРА СЕЛЕКТОВ В ВСПЛЫВАЮЩЕМ ОКНЕ
	$(document).ready(function(){

		var Iam_button=$(".modal-content");

		var ID_greyStripe_forSetting;
		var Iam_click_in_main_window_forSetting;
		var name_of_property_forSetting;

		var arrListOfIndexForSelect={};
		var arrListOfHideForDisplayElements={};
		var arrListOfHideForDisplayJumps={};

		var carrent_class;

		//-----------мониторинг поля вызова всплывающего окна
		$(".contanerTransparent").click(function(){
			Iam_click_in_main_window_forSetting=$(this);
			GetIDForSetting();
			ConfigurationOfPopUpWindow();
		});//КОНЕЦ мониторинга поля вызова всплывающего окна

		function GetIDForSetting(){
			ID_greyStripe_forSetting=Iam_click_in_main_window_forSetting.closest(".greyStripe").attr("id");
			return;
		};

		//мониторинг кнопки "сохранить"
		$(".buttonSave").click(function(){
			GetSelectInfo()
			GetHideInfo()
		});
		//мониторинг кнопки "сброс"
		$(".JSbuttonReset_Modal").click(function(){
			GetSelectInfo()
			GetHideInfo()
		});

		//функция определения и записи в объект значений выбранных селектов
		function GetSelectInfo(){
			$(".modal-content").find("select").each(function(index){
				MakeTheName_ForSetting(index);
				arrListOfIndexForSelect[name_of_property_forSetting]=$(this).prop("selectedIndex");
			});
			return
		};//КОНЕЦ GetSelectInfo()

		//функция определения и записи в объект активной части всплывающего окна
		function GetHideInfo(){
			$(".modal-content").find(".JSjumps, .JSspins, .JSsteps").each(function(index){
				MakeTheName_ForSetting(index);
				arrListOfHideForDisplayElements[name_of_property_forSetting]=$(this).css("display");
			});
			$(".modal-content").find(".hide.contanerGrey").each(function(index){
				MakeTheName_ForSetting(index);
				arrListOfHideForDisplayJumps[name_of_property_forSetting]=$(this).css("display");
			});
			return;
		};//КОНЕЦ GetHideInfo()

		// функция формирования вида всплывающего окна в соответствии со сделанным ранее выбором
		function ConfigurationOfPopUpWindow(){
			MakeTheName_ForSetting(0);
			if(arrListOfIndexForSelect[name_of_property_forSetting]!=undefined){
				Iam_button.find(".outputTitle_NameOfElement, .outputTitle").text("");
				Iam_button.find(".outputTitle_ValueOfElement, .outputValueOfElement").text("0.00");
			//показ активной части
				$(".modal-content").find("div.JSjumps, div.JSspins, div.JSsteps").each(function(index){
					MakeTheName_ForSetting(index);
					$(this).css("display", arrListOfHideForDisplayElements[name_of_property_forSetting]);
					carrent_class=$(this).attr("class");
				//симуляция нажатия кнопки
					if(arrListOfHideForDisplayElements[name_of_property_forSetting]=="block"){
						if(carrent_class=="hide JSjumps"){
							$(".JSbuttonJumps").click();
							$(".modal-content").find(".hide.contanerGrey").each(function(index){
								MakeTheName_ForSetting(index);
								$(this).css("display", arrListOfHideForDisplayJumps[name_of_property_forSetting] );
							});
						} else if(carrent_class=="hide JSspins"){
							$(".JSbuttonSpins").click();
						} else if(carrent_class=="hide JSsteps"){
							$(".JSbuttonSteps").click();
						};
					};//КОНЕЦ симуляции
				});//КОНЕЦ показа активной части

			//формирование состояние селектов
				$(".modal-content").find("select").each(function(index){
					MakeTheName_ForSetting(index);
					$(this).prop("selectedIndex", arrListOfIndexForSelect[name_of_property_forSetting]);
				//симуляция изменения значения селекта
					if(arrListOfIndexForSelect[name_of_property_forSetting]>0){
						$(this).change();
					};
				}); //КОНЕЦ формирования состояния селектов
			}else{
				ResetSelect(Iam_button);
				return;
			};
			return;
		};//КОНЕЦ ConfigurationOfPopUpWindow()

		//функция формирования имени свойства объектов
		function MakeTheName_ForSetting(index){
			name_of_property_forSetting=ID_greyStripe_forSetting;
			name_of_property_forSetting=name_of_property_forSetting+index;
			return;
		};//КОНЕЦ MakeTheName_ForSetting
	});//КОНЕЦ блока запоминания выбора селектов в всплывающем окне


	//БЛОК ПОКАЗА И СКРЫТИЯ ЧЕКБОКСА "вторая половина программы"
	$(document).ready(function(){

		var Iam_click_in_main_window_forShowAndHide;
		var ID_greyStripe_forShowAndHide;
		var display_for_ShowAndHide;

		//-----------мониторинг поля вызова всплывающего окна
		$(".contanerTransparent").click(function(){
			Iam_click_in_main_window_forShowAndHide=$(this);
			GetIDForShowAndHide();
		});//КОНЕЦ мониторинга поля вызова всплывающего окна

		function GetIDForShowAndHide(){
			ID_greyStripe_forShowAndHide=Iam_click_in_main_window_forShowAndHide.closest(".greyStripe").attr("id");
			return;
		};

		//мониторинг кнопки "сохранить"
		$(".buttonSave").click(function(){CheckIfElementIsJump()});
		//мониторинг кнопки "сброс"
		$(".JSbuttonReset_Modal").click(function(){CheckIfElementIsJump()});

		//функция проверки на выбор прыжкового элемента
		function CheckIfElementIsJump(){
			display_for_ShowAndHide=$(".modal-content").find(".JSjumps").css("display");
			if(display_for_ShowAndHide=="block"){
				ShowCheckbox_SecondHalf();
			}
			else{HideCheckbox_SecondHalf()};
		};//конец функции проверки на выбор прыжкового элемента

		function ShowCheckbox_SecondHalf(){
			$("#"+ID_greyStripe_forShowAndHide).find(".JScheckboxSecondPart").show();
		};
		function HideCheckbox_SecondHalf(){
			$("#"+ID_greyStripe_forShowAndHide).find(".JScheckboxSecondPart").prop("checked", false).hide();
		};
	});//КОНЕЦ блока показа и скрытия чекбокса "вторая половина программы"


	//БЛОК УМНОЖЕНИЯ СТОИМОСТИ ПРЫЖКА ЗА ИСПОЛНЕНИЕ ВО ВТОРОЙ ПОЛОВИНЕ ПРОГРАММЫ
	$(document).ready(function(){

		var Iam_checkbox_secondpart;

		$(".JScheckboxSecondPart").click(function(){
			Iam_checkbox_secondpart=$(this);
			BonusForSecondPart();
		});
		function BonusForSecondPart(){
			if(Iam_checkbox_secondpart.prop("checked")){
					Iam_for_bonus=$(this).parent().parent().find("output.JSoutputTransparent_ValueOfElement");
					val_of_output=Iam_for_bonus.val()*1.1;
					Iam_for_bonus.val(val_of_output.toFixed(2));
				};

		};
	});//КОНЕЦ блока умножения
