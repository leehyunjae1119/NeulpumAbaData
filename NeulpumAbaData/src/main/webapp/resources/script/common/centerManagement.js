var centerChoiseMoveUrl = "/mai/main";
var isManagementMode = false;
var isChangeCenterMode = false;

$(document).ready(function() {
	
	$.fn_centerManagerOpen = function(isManagement, isChangeCenter) {
		isManagementMode = isManagement;
		isChangeCenterMode = isChangeCenter;
		
		if(isManagementMode) {
			$('#centerChoiceModal').removeAttr('data-bs-backdrop');
			$('#centerChoiceModal').removeAttr('data-bs-keyboard');
		}
		
		if(isChangeCenterMode) {
			$('#centerChoiceModal').removeAttr('data-bs-backdrop');
			$('#centerChoiceModal').removeAttr('data-bs-keyboard');
			$('#centerAddBtn').remove();
		}
		
		$.init();
		$('#centerChoiceModal').modal('show');
	};
	
	$.init = function() {
		
		$("#centerAddBtn").removeClass("disabled");
		$("#centerEditer").hide();
		$("#centerBoard").show();
		
		//센터장 리스트 조회
		$.selectCenterLeader();
		
		//센터 리스트 조회
		$.selectCenterList();
		
	};
	
	$.selectCenterList = function() {
		var centerList = selectCenter();
		appendCenterList(centerList);
	};
	
	$.selectCenterLeader = function() {
		var param = {};
		
		$.ajax({
			url: "/common/ajax.selectCenterLeader"
			, type : "post"
			, data : JSON.stringify(param)
			, contentType : 'application/json; charset=utf-8'
			, async : false
			, success : function(data) {
				appendCenterLeaderSelector(data);
				
			}
			, error : function(request, status, error) {
				fn_alert("센터장 목록을 조회하지 못했습니다.", "waring");
			}
		});
	};
	
	$("#centerAddBtn").on("click", function(){
		$(this).addClass("disabled");
		$("#centerBoard").hide();
		$("#centerEditer").show();
		
		initCenterInputTag();
	});
	
	$("#centerSaveBtn").on("click", function(){
		var centerSeq = $("#centerSeq").val();
		if(centerSeq){
			updateCenter(centerSeq);
		} else {
			insertCenter();
		}
	});
	
	$("#centerCancelBtn").on("click", function(){
		$("#centerAddBtn").removeClass("disabled");
		$("#centerEditer").hide();
		$("#centerBoard").show();
	});
	
	$("#centerName").on("keyup", function() {
		var centerName = $("#centerName").val();
		$("#exCenterName").text(centerName);
	});
	
	$("#centerLeader").on("change", function() {
		var centerLeader = $("#centerLeader > option:selected").attr("data-text");
		$("#exCenterLeader").text(centerLeader);
	});
	
	$("#centerRepresentativeImage").on("change", function() {
		var centerRepresentativeImage = $("#centerRepresentativeImage > option:selected").val();
		var imgPath = "../image/profile_img/"+centerRepresentativeImage+".jpg";
		if(fn_nullCheck(centerRepresentativeImage)){
			$("#exCenterRepresentativeImage").attr("src", imgPath);
		}
	});
	
});

function appendCenterLeaderSelector(data) {
	var html = '';

	html += '<option value="" data-text="이름" selected>센터장을 선택해주세요...</option>';
	data.managerList.forEach(function(item) {
		var seq = item.memberSeq;
		var name = item.memberName;
		
		html +=  '<option value="'+seq+'" data-text="'+name+'">'+name+'</option>';
	});
	
	$("#centerLeader").empty();
	$("#centerLeader").append(html);
};

function insertCenter() {
	if(!fn_inputValidation("centerName", true)){ return;}
	if(!fn_inputValidation("centerLeader", true)){ return;}
	if(!fn_inputValidation("centerRepresentativeImage", true)){ return;}
	
	var param = {
		centerName : $("#centerName").val(),
		centerManager : $("#centerLeader").val(),
		centerImage : $("#centerRepresentativeImage").val()
	};
	
	$.ajax({
		url: "/common/ajax.insertCenter"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			
			$.selectCenterList();
			
			$("#centerAddBtn").removeClass("disabled");
			$("#centerEditer").hide();
			$("#centerBoard").show();
		}
		, error : function(request, status, error) {
			fn_alert("센터 등록을 완료하지 못했습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function selectCenter(centerSeq) {
	
	var resultList = new Array();

	var param = {
			centerSeq : centerSeq
		};
	
	$.ajax({
		url: "/common/ajax.selectCenterList"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			resultList = data.centerList;
		}
		, error : function(request, status, error) {
			fn_alert("센터 데이터를 조회하지 못했습니다. 담당자에게 연락하세요.", "warning")
		}
	});
	return resultList;
}

function getCenterSeq(object) {
	var result = $(object).parents(".card[name=centerCard]").children("input[name=centerSeq]").val();
	return result;
}

function getCenterManager(object) {
	var result = $(object).parents(".card[name=centerCard]").children("input[name=centerManager]").val();
	return result;
}

function appendCenterList(centerList) {
	
	var html  = "";
	
	centerList.forEach(function(item) {
		html += '<div class="item-xy-center m-3">																					';
		html += '	<div class="card" name="centerCard" style="width: 15rem;">														';
		html += '		<input type="hidden" name="centerSeq" value="'+item.centerSeq+'">											';
		html += '		<input type="hidden" name="centerManager" value="'+item.centerManager+'">									';
		html += '		<div class="card-centerImage">																				';
		html += '			<img src="../image/profile_img/'+item.centerImage+'.jpg" class="card-img-top" alt="...">				';
		html += '			<div class="card-img-overlay card-img-overbody">														';
		html += '				<span class="card-img-label">'+item.centerName+'</span>												';
		html += '			</div>																									';
		html += '		</div>																										';
		html += '		<div class="card-body" style="z-index: 100;">																';
		html += '			<div class="card-title f-between">																		';
		html += '				<div>																								';
		html += '					<span>센터장</span>																				';
		html += '					<h4>'+item.memberName+'</h4>																	';
		html += '				</div>																								';
		if(!isChangeCenterMode){
			html += '				<div class="dropup dropdown">																		';
			html += '					<a href="#" class="card-drop text-secondary" data-bs-toggle="dropdown" aria-expanded="false">	';
			html += '						<i class="bi bi-three-dots-vertical"></i>													';
			html += '					</a>																							';
			html += '					<div class="dropdown-menu dropdown-menu-end">													';
			html += '						<a href="javascript:void(0);" class="dropdown-item" name="centerEditBtn">Center Edit</a>	';
			html += '						<a href="javascript:void(0);" class="dropdown-item" name="centerRemoveBtn">Center Remove</a>';
			html += '					</div>																							';
			html += '				</div>																								';
		}
		html += '			</div>																									';
//		html += '			<div class="card-text">																					';
//		html += '				<span>선생님 - '+item.memberCnt+' 명</span><br>														';
//		html += '				<span>아동 - '+item.childrenCnt+' 명</span>															';
//		html += '			</div>																									';
		html += '		</div>																										';
		html += '	</div>																											';
		html += '</div>																												';
	});
	
	$("#centerBoard").empty();
	$("#centerBoard").append(html);
	
	//센터 입장 이벤트 추가
	$("#centerChoiceModal .modal-body .card-centerImage").each(function() {
		this.addEventListener('click', function(e) {
			var centerSeq = getCenterSeq(this);
			if(!isManagementMode){
				//센터번호 세션에 저장
				sessionStorage.clear();
				sessionStorage.setItem("centerSeq", centerSeq);
				fn_formUrlMove(centerChoiseMoveUrl, "GET");
			}
		});
	});
	
	//센터 정보 수정 이벤트 추가
	$("#centerChoiceModal .modal-body a[name=centerEditBtn]").each(function() {
		this.addEventListener('click', function(e) {
			var centerSeq = getCenterSeq(this);
			editCenter(centerSeq);
		});
	});
	
	//센터 정보 삭제 이벤트 추가
	$("#centerChoiceModal .modal-body a[name=centerRemoveBtn]").each(function() {
		this.addEventListener('click', function(e) {
			var centerSeq = getCenterSeq(this);
			fn_confirm("정말 삭제하시겠습니까?", function() {
				deleteCenter(centerSeq);
			}, "danger");
		});
	});
}

function editCenter(centerSeq) {
	var centerList = selectCenter(centerSeq);
	var center = centerList[0];
	
	initCenterInputTag(center);
	
	$(this).addClass("disabled");
	$("#centerBoard").hide();
	$("#centerEditer").show();
}

function initCenterInputTag(center) {
	var centerSeq = center ? center.centerSeq : "";
	var centerName = center ? center.centerName : "";
	var centerLeader = center ? center.centerManager : "";
	var centerRepresentativeImage = center ? center.centerImage : "01";
	
	$("#centerSeq").val(centerSeq);
	$("#centerName").val(centerName);
	$("#centerLeader").val(centerLeader);
	$("#centerRepresentativeImage").val(centerRepresentativeImage);
	
	$("#centerName").trigger("keyup");
	$("#centerLeader, #centerRepresentativeImage").trigger("change");
}

function updateCenter(centerSeq) {
	if(!fn_inputValidation("centerName", true)){ return;}
	if(!fn_inputValidation("centerLeader", true)){ return;}
	if(!fn_inputValidation("centerRepresentativeImage", true)){ return;}
	
	var param = {
		centerSeq : centerSeq,
		centerName : $("#centerName").val(),
		centerManager : $("#centerLeader").val(),
		centerImage : $("#centerRepresentativeImage").val()
	};
	
	$.ajax({
		url: "/common/ajax.updateCenter"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			
			$.selectCenterList();
			
			$("#centerAddBtn").removeClass("disabled");
			$("#centerEditer").hide();
			$("#centerBoard").show();
		}
		, error : function(request, status, error) {
			fn_alert("센터 정보 수정을 완료하지 못했습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}

function deleteCenter(centerSeq) {
	
	var param = {
		centerSeq : centerSeq
	};
	$.ajax({
		url: "/common/ajax.deleteCenter"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			
			$.selectCenterList();
			
			$("#centerAddBtn").removeClass("disabled");
			$("#centerEditer").hide();
			$("#centerBoard").show();
		}
		, error : function(request, status, error) {
			fn_alert("센터 삭제를 완료하지 못했습니다. 담당자에게 연락하세요.", "warning")
		}
	});
}



