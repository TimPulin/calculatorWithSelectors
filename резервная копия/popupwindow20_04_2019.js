	//---------------мониторинг изменения значения селекта для блокировки/разблокировки селектов------------
	$(document).ready(function(){	
		$("select").not(".JSSecondarySelect").change (function(){
			var Iam=$(this);
			var value_of_selected=Iam.val();
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
	
	//СКРИПТЫ ВСПЛЫВАЮЩЕГО ОКНА
	
	//БЛОК ПОВЕДЕНИЯ КНОПОК
	$(document).ready(function(){
		
		//----------установка свойства "disabled" и "hide"-------------	
		AddHideAndDisabled();
		function AddHideAndDisabled(){
			$(".disabled").prop("disabled",true);
			$(".hide").hide;
		};//КОНЕЦ установки свойства "disabled"
		
		//--------------мониторинг кнопки "прыжки"----------------
		$(".JSbuttonJumps").click(function(){
			var Iam_button=$(this).parent().parent();
			Reset(Iam_button);
			Iam_button.find(".JSjumps").show();
			Iam_button.find(".outputTitle").text("прыжковый элемент")
		});//КОНЕЦ мониторинга "прыжки"
		
		//---------мониторинг кнопки "вращения"----------------
		$(".JSbuttonSpins").click(function(){
			var Iam_button=$(this).parent().parent();
			Reset(Iam_button);
			Iam_button.find(".JSspins").show();
			Iam_button.find(".outputTitle").text("вращение")
		});
		
		//--------------мониторинг кнопки "дорожки"----------------
		$(".JSbuttonSteps").click(function(){
			var Iam_button=$(this).parent().parent();
			Reset(Iam_button);
			Iam_button.find(".JSsteps").show();
			Iam_button.find(".outputTitle").text("дорожка")
		});//КОНЕЦ мониторинга "дорожки"
		
		//---------------------мониторинг кнопки "сброс"-------------------------
		$(".buttonReset").click(function(){
			var Iam_button=$(this).parent().parent();
			Reset(Iam_button);	
		});//КОНЕЦ мониторинга "сброс"
		
		//функция "сброс"
		function Reset(Iam_button){
			Iam_button.find(".hide").hide();
			Iam_button.find("select").prop("selectedIndex","0");
			Iam_button.find(".disabled").prop("disabled",true);
			Iam_button.find(".outputTitle_NameOfElement, .outputTitle").text("");
			Iam_button.find(".outputTitle_ValueOfElement, .outputValueOfElement").text("0.00");
		};//КОНЕЦ функции "сброс"
	
	
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
		$("select").change(function(){
			let Iam_select=$(this);
			let value_of_selected=Iam_select.val();
			if (value_of_selected==0){
				ShowNameOfSelect(Iam_select);
			};
		});//КОНЕЦ мониторинга для показа имени
		
		//функция показа имени селекта
		function ShowNameOfSelect(Iam_select){Iam_select.prop("selectedIndex","0")};
	});//----------------------------КОНЕЦ блока поведения кнопок
	
	
	
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
		
		//показ имени селектов в третьем ряду
		function ShowNamesThirdRow(Iam_SelectFloat){
			Iam_SelectFloat.find("option").not("option[value=0]").remove();
			Iam_SelectFloat.parent().find("select").prop("selectedIndex", "0")
			return
		};// КОНЕЦ показа имени селектов в третьем ряду
	});//КОНЕЦ блока работы с третьим прыжком в каскаде
	
	//БЛОК СЕЛЕКТА С Е
	$(document).ready(function(){
		$(".JSNeedE").change(function(){
			Iam_need_e=$(this);
			let value_of_selected=Iam_need_e.val();
			if (value_of_selected==="F"||value_of_selected==="Lz"){
				Iam_need_e.next().next().show().css("color","#999");
			} else{Iam_need_e.next().next().hide()};
		});
		$(".JSselectE").change(function(){
			Iam_e=$(this);
			let value_of_selected=Iam_e.val();
			if (value_of_selected!="e"){
				Iam_e.css("color","#999");
			}else{Iam_e.css("color","#333")}
		});
	});//КОНЕЦ блока с Е
	
	//СКРИПТЫ ВЫЧИСЛИТЕЛЬНОЙ ЧАСТИ
	$(document).ready(function(){
		
		//-----------мониторинг селектов----------
		$("select").change(function(){					
			var Iam_for_Calculation=$(this).parent().parent().parent().parent();
			Calculation(Iam_for_Calculation);
		});//КОНЕЦ мониторинга селектов
		
		//----------------функция подсчета--------------
		function Calculation(Iam_for_Calculation){
			var cuter_of_one_element=0;
			var counter_of_jumps=1;
			var arrOfItems=[];
			var item="";
			var score=0;
			var score_sub=0;
			
			Iam_for_Calculation.find("select").each(function(){//цикл проверки полей
				cuter_of_one_element=cuter_of_one_element+1;
				var Iam=$(this);
				var option_of_select=Iam.val();
				
				if (option_of_select==null || option_of_select==0){
					option_of_select="";
				};
				
				item=item+option_of_select;
				
				if (cuter_of_one_element==3){					//отсчет трех селектов (одного элемента)
					var itemLow = item.toLowerCase();
					score=list_value[itemLow];
					if (score==undefined){
						score=0;
						item=null;
					};
					
					score_sub=score_sub+score;
					
					if (counter_of_jumps==2 && item!=null){ // отсчет второго элемента для комбинации прыжков
						CheckAxels(itemLow);
						if (CheckAxels(itemLow)){
						score_sub=score_sub*0.8;
						item=item+"+SEQ";
						};
					};//КОНЕЦ отсчет второго элемента для комбинации прыжков
					
					if (counter_of_jumps>=2 && item!=null){ //отсчет второго и третьего прыжка для каскадов
						item="+"+item;
					};
					
					ShowItemAndScoreInPopup(item, Iam)
					
					counter_of_jumps=counter_of_jumps+1;
					cuter_of_one_element=0;
					item="";
					score=0;
				};//КОНЕЦ отсчета трех селектов
			});//КОНЕЦ цикла проверки полей
			
			//функция вывода названия элемента и его стоимости в вверхнюю строчку всплывающего окна
			function ShowItemAndScoreInPopup(item, Iam){
				arrOfItems.push(item);
				Iam_for_Calculation.parent().find(".outputTitle_NameOfElement").text(arrOfItems.join(""));
				Iam_for_Calculation.parent().find(".outputTitle_ValueOfElement").text(score_sub.toFixed(2));
				Iam.parent().parent().find("output").text(score.toFixed(2));
			};//КОНЕЦ
			
			//функция проверки второго элемента - является ли он акселем
			function CheckAxels(itemLow){
				for (var i=0; i<arrOfAxels.length; i++){
					if(arrOfAxels[i]===itemLow){
						return true;	
					};	
				};
				return false;
			};//КОНЕЦ функции проверки второго элемента
		};//--------------------КОНЕЦ функции подсчета--------------
			
			
			
		
		
	}); //КОНЕЦ СКРИПТОВ ВЫЧИСЛИТЕЛЬНОЙ ЧАСТИ
	
	
	