
	//СКРИПТЫ ВСПЛЫВАЮЩЕГО ОКНА

	//---------------мониторинг изменения значения селекта для блокировки/разблокировки селектов------------
	$(document).ready(function(){
		var Iam
		
		$("div.JSmodalWindow select").not(".JSSecondarySelect").change (function(){
			Iam=$(this);
			if (Iam.val()==0){
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
			if ($(this).val()!=0){
				$(this).parent().parent().next().prop("disabled", false);
			};
		}); //КОНЕЦ разблокировки

		//-------------------работа кнопки "добавить прыжок"-----------------
		$(".buttonAddJump").click(function(){
			$(this).parent().next().show()
		});//КОНЕЦ "добавить прыжок"

		//--------------мониторинг изменения значения селектов для показа имени
		$("div.contanerGrey select").change(function(){
			if ($(this).val()==0){
				$(this).prop("selectedIndex","0")
			};
		});//КОНЕЦ мониторинга для показа имени
		
		//мониторинг изменения селекта с дорожками
		$(".JSselectStep").change(function(){
			if ($(this).val()==="ChSq"){
				$(this).next().prop("selectedIndex", "3").prop("disabled", true);
			};
		});
	});//----------------------------КОНЕЦ блока поведения кнопок


	//БЛОК РАБОТЫ С ТРЕТЬИМ ПРЫЖКОМ В КАСКАДЕ
	$(document).ready(function(){
		
		var Iam;
		var Iam_SelectFloat;
		//--------------мониторинг изменения значения селекта для формирования списка возможного третьего прыжка в каскаде-------------
		$(".JSSelectChanger").change(function(){
			Iam=$(this);
			Iam_SelectFloat=Iam.parent().parent().parent().next().find(".JSSelectFloatOptions");
			let value_of_selected=Iam.val();
			if ($(this).val()==="A"){
				LockAllSelect(Iam)
				Iam.prev().prop("disabled",false);
			} else if ($(this).val()==="Eu"){
				AddOptionsForEu()
			} else {AddOptionsForLoT()};
		});//КОНЕЦ мониторинга для определения третьего прыжка

		//функция изменения options в третьем прыжке каскада для оллера
		function AddOptionsForEu(){
			Iam.prev().prop("selectedIndex","2").prop("disabled",true);
			ShowNamesThirdRow();
			$.each(arrOptionsForEu, function(value, key){
				Iam_SelectFloat.append('<option value="'+value+'">'+key+'</option>')
			});//КОНЕЦ each()
		};//КОНЕЦ AddOptionsForEu()

		//функция изменения options в третьем прыжке каскада для тулупа и ритбергера
		function AddOptionsForLoT(){
			Iam.prev().prop("disabled",false)
			ShowNamesThirdRow();
			$.each(arrOptionsForLoT, function(value, key){
				Iam_SelectFloat.append('<option value="'+value+'">'+key+'</option>')
			});//КОНЕЦ each()
		};//КОНЕЦ AddOptionsForLoT()

		//показ имени селектов в третьем ряду, сброс выпадающего списка в селекте "прыжки"
		function ShowNamesThirdRow(){
			Iam_SelectFloat.find("option").not("option[value=0]").remove();
			Iam_SelectFloat.parent().find("select").prop("selectedIndex", "0")
			return
		};// КОНЕЦ показа имени селектов в третьем ряду
	});//КОНЕЦ блока работы с третьим прыжком в каскаде


	//БЛОК СЕЛЕКТА С Е и V
	$(document).ready(function(){
		
		var value_of_selected;
		
		$(".JSNeedAdditionalSelect").change(function(){
			value_of_selected=$(this).val();
			CheckForAdditionalSelect();
			if (CheckForAdditionalSelect()){
				$(this).parent().find("select").last().show().css("color","#999").prop("selectedIndex", "0");
			} else{$(this).parent().find("select").last().prop("selectedIndex", "0").hide()};
		});
		$(".JSselectAdditional").change(function(){
			if ($(this).val()==0||$(this).val()==null){
				$(this).css("color","#999");
			}else{$(this).css("color","#333")}
		});

		function CheckForAdditionalSelect(){
			for (let i=0; i<arrForAdditionalSelect.length; i++){
				if (arrForAdditionalSelect[i]===value_of_selected){
					return true
				};
			};
			return false
		};
	});//КОНЕЦ блока с Е и V
	
	//БЛОК ПОКАЗА И СКРЫТИЯ ЧЕКБОКСА "вторая половина программы"
	$(document).ready(function(){

		var Iam_click_in_main_window_forShowAndHide;
		var ID_greyStripe_forShowAndHide;
		
		var value_of_select1;
		var value_of_select2;
		
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
		$(".JSbuttonReset_Modal").click(function(){HideCheckbox_SecondHalf()});

		//функция проверки на выбор прыжкового элемента
		function CheckIfElementIsJump(){
			value_of_select1=$("div.JSjumps select.JSNeedAdditionalSelect").val();
			value_of_select2=$("div.JSjumps select.JSNeedAdditionalSelect").prev().val();
			if(value_of_select1!=null && value_of_select2!=null){
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
		
		//----------БЛОК СБРОСА ВСЕХ ЭЛЕМЕНОВ-----------
		//мониторинг кнопки "сброс" в главном окне
		$(".JSbuttonReset_Main").click(function(){
			$(".JScheckboxSecondPart").prop("checked", false).hide();
		});
		
	});//КОНЕЦ блока показа и скрытия чекбокса "вторая половина программы"
	//КОНЕЦ скриптов всплывающего окна





	//БЛОК ВЫЧИСЛЕНИЙ
	$(document).ready(function(){

		var ID_greyStripe_forCounting;
		var arrValueAndNameOfElement={};
		var arrRealValueOfElement={};
		var name_of_property_for_main_counting;
		var value_of_property_for_main_counting;
		var Iam_click_in_main_window;
		var value_of_element;
		var name_of_element;
		var total_value=0;
		var key;
		
		//переменные для Calculation()
		var arrOfItems=[];
		var item;
		var itemLow;
		var score;
		var score_of_element_in_modal;
		var option_of_select;
		var Iam;
		var Iam_for_Calculation;
		
		//ВЫЧИСЛЕНИЯ В ГЛАВНОМ ОКНЕ
		//-----------мониторинг поля для вызова всплывающего окна
		$(".contanerTransparent").click(function(){
			Iam_click_in_main_window=$(this);
			GetID();
			$("#windowElement").modal();
		});//КОНЕЦ мониторинга поля для вызова всплывающего окна

		//мониторинг кнопки "сохранить"
		$(".buttonSave").click(function(){DirectorBetweenMainAndModalWindow()});
		//мониторинг кнопки "сброс"
		$(".JSbuttonReset_Modal").click(function(){DirectorBetweenMainAndModalWindow()});

		function DirectorBetweenMainAndModalWindow(){
			Calculation();
			PushInto_arrValueAndNameOfElement();
			DirectorMainWindow();
		};
		
		//мониторинг чекбокса "вторая половина программы"
		$(".JScheckboxSecondPart").click(function(){
			Iam_click_in_main_window=$(this);
			GetID();
			DirectorMainWindow();
		});
		
		function DirectorMainWindow(){
			MakeTheName();
			value_of_element=arrValueAndNameOfElement[value_of_property_for_main_counting];
			name_of_element=arrValueAndNameOfElement[name_of_property_for_main_counting];
			//LetsCountGOE();
			BonusForSecondPart();
			PrintInForElement();
			PushInto_arrRealValueOfElement();
			TotalValueOfProgram();
			PrintInForProgram();
			ResetVar();
		};
		
		//добавление бонуса за исполнения прыжка во второй половине программы
		function BonusForSecondPart(){
			if($("#"+ID_greyStripe_forCounting).find(".JScheckboxSecondPart").prop("checked")){
				value_of_element=value_of_element*1.1;
				return;
			};
			return;
		};

		//вывод названия элемента и его стоимости на главную страницу
		function PrintInForElement(){
			$("#"+ID_greyStripe_forCounting).find(".JSoutputTransparent_NameOfElement").text(name_of_element);
			$("#"+ID_greyStripe_forCounting).find(".JSoutputTransparent_ValueOfElement").text(value_of_element.toFixed(2));
			return;
		};
		
		//запись реальной стоимости элемента в объект
		function PushInto_arrRealValueOfElement(){
			arrRealValueOfElement[value_of_property_for_main_counting]=value_of_element;
			return;
		};
		
		//вычисление полной стоимости программы
		function TotalValueOfProgram(){
			for (key in arrRealValueOfElement){
				total_value=total_value+arrRealValueOfElement[key];
			};
			return;
		};
		
		//вывод полной стоимости программы на главную страницу
		function PrintInForProgram(){
			$("#outTotal").text(total_value.toFixed(2));
		};
		
		//функция получения ID
		function GetID(){
			ID_greyStripe_forCounting=Iam_click_in_main_window.closest(".greyStripe").attr("id");
			return;
		};
		
		//функция формирования объекта arrValueAndNameOfElement с названием элемента и его базовой стоимостью
		function PushInto_arrValueAndNameOfElement(){
			MakeTheName();
			arrValueAndNameOfElement[name_of_property_for_main_counting]=arrOfItems.join("");
			arrValueAndNameOfElement[value_of_property_for_main_counting]=score_of_element_in_modal;
			return;
		};

		//функция формирования имени свойства объекта arrValueAndNameOfElement
		function MakeTheName(){
			name_of_property_for_main_counting=ID_greyStripe_forCounting+"name";
			value_of_property_for_main_counting=ID_greyStripe_forCounting+"value";
			return;
		};

		//сброс переменных
		function ResetVar(){
			ID_greyStripe_forCounting=null;
			CleanUp_arrOfItems();
			item="";
			score=0;
			score_of_element_in_modal=0;
			value_of_element=0;
			name_of_element="";
			total_value=0;
			Iam=null;
			return;
		};

		//очистка массива набранных элементов в всплывающем окне
		function CleanUp_arrOfItems(){
			arrOfItems.splice(0, arrOfItems.length);
			return
		};//КОНЕЦ CleanUp_arrOfItems
		//КОНЕЦ вычислений в главном окне


		//---------ФУНКЦИИ ВЫЧИСЛЕНИЯ В ВСПЛЫВАЮЩЕМ ОКНЕ--------
		
		//мониторинг селектов
		$("div.JSmodalWindow select").change(function(){
			Iam_for_Calculation=$(this).parent().parent().parent().parent();
			DirectorModalWindow();
		});//КОНЕЦ мониторинга селектов

		function DirectorModalWindow(){
			Calculation();
			ShowItemAndScoreInModalWindow();
		};
		
		//функция подсчета
		function Calculation(){

			score_of_element_in_modal=0;
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

				score_of_element_in_modal=score_of_element_in_modal+score;

				if (index==1 && item!=null){ // отсчет второго элемента для комбинации прыжков
					CheckAxels(itemLow);
					if (CheckAxels(itemLow)){
						score_of_element_in_modal=score_of_element_in_modal*0.8;
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
		function ShowItemAndScoreInModalWindow(){
			Iam_for_Calculation.parent().find(".outputTitle_NameOfElement").text(arrOfItems.join(""));
			Iam_for_Calculation.parent().find(".outputTitle_ValueOfElement").text(score_of_element_in_modal.toFixed(2));
			return;
		};//КОНЕЦ ShowItemAndScoreInModalWindow()

		//функция проверки второго элемента - является ли он акселем
		function CheckAxels(itemLow){
			for (let i=0; i<arrOfAxels.length; i++){
				if(arrOfAxels[i]===itemLow){
				return true;
				};
			};
			return false;
		};//КОНЕЦ CheckAxels(itemLow)

		//КОНЕЦ функций вычисления в всплывающем окне
		
		//----------БЛОК СБРОСА ВСЕХ ЭЛЕМЕНОВ-----------
		//мониторинг кнопки "сброс" в главном окне
		$(".JSbuttonReset_Main").click(function(){
			TotalResetInMain();
		});
		
		function TotalResetInMain(){
			ResetVar();
			for (key in arrValueAndNameOfElement){
				delete arrValueAndNameOfElement[key];
			};
			for (key in arrRealValueOfElement){
				delete arrRealValueOfElement[key];
			};
			$(".JSoutputTransparent_NameOfElement").text(name_of_element);
			$(".JSoutputTransparent_ValueOfElement").text(value_of_element.toFixed(2));
			PrintInForProgram();
		};
		//КОНЕЦ блока сброса всех элементов
	});//КОНЕЦ блока вычислений



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
		
		
		//----------БЛОК СБРОСА ВСЕХ ЭЛЕМЕНОВ-----------
		//мониторинг кнопки "сброс" в главном окне
		$(".JSbuttonReset_Main").click(function(){
			TotalResetInModal();
		});
		function TotalResetInModal(){
			for (key in arrListOfIndexForSelect){
					delete arrListOfIndexForSelect[key];
				};
				for (key in arrListOfHideForDisplayElements){
					delete arrListOfHideForDisplayElements[key];
				};
				for (key in arrListOfHideForDisplayJumps){
				delete arrListOfHideForDisplayJumps[key];
			};
		};		
		//КОНЕЦ блока сброса всех элементов
	});//КОНЕЦ блока запоминания выбора селектов в всплывающем окне





	
