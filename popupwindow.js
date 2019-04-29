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
			$(".hide").hide;
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
		
		
		//-------------------работа кнопки "добавить прыжок"-----------------
		$(".buttonAddJump").click(function(){
			$(this).parent().next().show()
		});//КОНЕЦ "добавить прыжок" 
		
		//---------разблокировка кнопки "добавить прыжок"
		$(".unlockBtnAddJump").change(function(){
			let Iam_btn_add_jump=$(this);
			let value_of_selected=Iam_btn_add_jump.val();
			if (value_of_selected!=0){
				Iam_btn_add_jump.parent().parent().next().prop("disabled", false);
			};
		}); //КОНЕЦ разблокировки
		
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
		
		//переменные для Calculation()
		var Iam_contanerTransparent_forCounting;
		var arrOfItems=[];
		var arrBus=[];
		var item;
		var score;
		var score_sub;
		var Iam;
		var Iam_for_Calculation;
		
		//-----------мониторинг поля для вызова всплывающего окна
		$(".contanerTransparent").click(function(event){
			Iam_contanerTransparent_forCounting=event.target.id;
			$("#windowElement").modal();
		});//КОНЕЦ мониторинга поля для вызова всплывающего окна
		
		//-----------мониторинг селектов----------
		$("div.JSmodalWindow select").change(function(){					
			Iam_for_Calculation=$(this).parent().parent().parent().parent();
			Calculation(Iam_for_Calculation, arrOfItems, arrBus, item, score, score_sub);
			Reading_arrBus();
		});//КОНЕЦ мониторинга селектов
		
		function Reading_arrBus(){
			arrOfItems=arrBus[0];
			score_sub=arrBus[1];
			arrBus.splice(0,arrBus.length);
		};
		
		//мониторинг кнопки "сохранить"
		$(".buttonSave").click(function(){
			Calculation(Iam_for_Calculation, arrOfItems, arrBus, item, score, score_sub);
			PrintIn();
			ResetVar();
		});
		
		//мониторинг кнопки "сброс"
		$(".JSbuttonReset_Modal").click(function(){
			ResetVar();
			PrintIn()
		});
		
		//функция вывода названия элемента и стоимости на главную страницу
		function PrintIn(){
			$("#"+Iam_contanerTransparent_forCounting).find(".JSoutputTransparent_NameOfElement").text(arrOfItems.join(""));
			$("#"+Iam_contanerTransparent_forCounting).parent().parent().find(".JSoutputTransparent_ValueOfElement").text(score_sub.toFixed(2));
			return;
		};
		
		//функция сброса переменных
		function ResetVar(){
			Iam_contanerTransparent_forCounting=undefined;
			Iam_for_Calculation=undefined;
			CleanUp_arrOfItems(arrOfItems);
			item="";
			score=0;
			score_sub=0;
			Iam=undefined;
			return;
		};
	});//КОНЕЦ СКРИПТОВ СВЯЗИ С ВСПЛЫВАЮЩИМ ОКНОМ (с вычислительной частью)	
	
	
	//БЛОК ВЫЧИСЛИТЕЛЬНОЙ ЧАСТИ
	
	//----------------функция подсчета--------------
	function Calculation(Iam_for_Calculation, arrOfItems, arrBus, item, score, score_sub){
		var itemLow;
		var option_of_select;
		score_sub=0;
		CleanUp_arrOfItems(arrOfItems);
		if(Iam_for_Calculation==undefined){
			Push_arrBus(arrOfItems, score_sub, arrBus);
			return arrBus;
		};
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
			});//конец цикла проверки полей
			
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
				
			if (index>=1 && item!=null){ //отсчет второго и третьего прыжка для каскадов
				item="+"+item;
			};
			
			ShowItemAndScoreInPopup(Iam_for_Calculation, arrOfItems, item, score, score_sub);
		});//КОНЕЦ цикла проверки всех селектов
		Push_arrBus(arrOfItems, score_sub, arrBus);
		return arrBus;
	};//КОНЕЦ Calculation()	
	
	//функция упаковки переменных в массив
	function Push_arrBus(arrOfItems, score_sub, arrBus){
		arrBus.push(arrOfItems);
		arrBus.push(score_sub);
		return arrBus;
	};//КОНЕЦ Push_arrBus()
			
	//функция вывода названия элемента и его стоимости в вверхнюю строчку всплывающего окна
	function ShowItemAndScoreInPopup(Iam_for_Calculation, arrOfItems, item, score, score_sub){
		if(item!=null){
			arrOfItems.push(item);
		};
		Iam_for_Calculation.parent().find(".outputTitle_NameOfElement").text(arrOfItems.join(""));
		Iam_for_Calculation.parent().find(".outputTitle_ValueOfElement").text(score_sub.toFixed(2));
		Iam.parent().parent().find("output").text(score.toFixed(2));
		return;
	};//КОНЕЦ ShowItemAndScoreInPopup()
	
	//функция очистки массива набранных элементов в всплывающем окне
	function CleanUp_arrOfItems(arrOfItems){
		arrOfItems.splice(0, arrOfItems.length);
		return
	};//КОНЕЦ CleanUp_arrOfItems
			
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
	
	
	
	
	//БЛОК ЗАПОМИНАНИЯ ВЫБОРА СЕЛЕКТОВ В ВСПЛЫВАЮЩЕМ ОКНЕ
	$(document).ready(function(){
		
		var Iam_contanerTransparent_forSetting;
		
		var arrListOfDivForSelect={};
		var arrListOfDivForDisplay={};
		
		var index_of_selected;
		var Iam_button=$(".modal-content");
		var value_of_display;
		
		//-----------мониторинг поля вызова всплывающего окна
		$(".contanerTransparent").click(function(event){
			Iam_contanerTransparent_forSetting=event.target.id;
			ResetSelect(Iam_button);
			alert("поля вызова")
			alert(arrListOfDivForSelect[Iam_contanerTransparent_forSetting][0].options.selectedIndex);
			alert(arrListOfDivForSelect[Iam_contanerTransparent_forSetting][1].options.selectedIndex);
			ConfigurationOfPopUpWindow(arrListOfDivForSelect);
		});//КОНЕЦ мониторинга поля вызова всплывающего окна
		
		//мониторинг кнопки "сохранить"
		$(".buttonSave").click(function(){
			GetSelectInfo()
			GetHideInfo()
			alert("сохранить")
			alert(arrListOfDivForSelect[Iam_contanerTransparent_forSetting][0].options.selectedIndex)
			alert(arrListOfDivForSelect[Iam_contanerTransparent_forSetting][1].options.selectedIndex)
		});	
		
		
		function GetSelectInfo(){
			arrListOfDivForSelect[Iam_contanerTransparent_forSetting]=$(".modal-content").find("select");
			return;
		};
		
		function GetHideInfo(){
			arrListOfDivForDisplay[Iam_contanerTransparent_forSetting]=$(".modal-content").find(".JSjumps, .JSspins, .JSsteps");
			return;
		};
		
		function ConfigurationOfPopUpWindow(arrListOfDivForSelect){
			
			if(arrListOfDivForSelect[Iam_contanerTransparent_forSetting]!=undefined){
				$(".modal-content").find("select").each(function(index){
					index_of_selected=arrListOfDivForSelect[Iam_contanerTransparent_forSetting][index].options.selectedIndex;
					$(this).prop("selectedIndex", index_of_selected)
				});
				$(".modal-content").find(".JSjumps, .JSspins, .JSsteps").each(function(index){
					value_of_display=arrListOfDivForDisplay[Iam_contanerTransparent_forSetting][index].style.display;
					$(this).css("display", value_of_display);
				});	
			} else{return};
			return;
		};
	});//КОНЕЦ БЛОКА ЗАПОМИНАНИЯ ВЫБОРА СЕЛЕКТОВ В ВСПЛЫВАЮЩЕМ ОКНЕ
	
	
	
	