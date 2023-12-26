var isEditMode = false;
var selectDomainSeq;
var selectLtoSeq;
var selectStoSeq;

var editModalTarget;
var isEditModalAdd = true;
var editSeq;

var removeSeq;
var removeTarget;

$(document).ready(function() {
	
	$("#editModeChangeBtn").on("click", function() {
		isEditMode = !isEditMode;
		
		if(isEditMode){
			$(".newBtnArea").show();
			$(".orderBtnArea").hide();
			$(".editBtnArea").show();
		} else {
			$(".newBtnArea").hide();
			$(".orderBtnArea").show();
			$(".editBtnArea").hide();
		}
	});
	
	$(".saveInfoBtn").on("click", function() {
		if(!isEditModalAdd){
			if(editModalTarget === "dto") {
				if($("#modifyDomainName").val() === ''){
					fn_alert("영역 이름을 작성해주세요.", "danger");
					$("#modifyDomainName").focus();
					return;
				}
			} else if(editModalTarget === "lto") {
				if($("#modifyLtoName").val() === ''){
					fn_alert("장기목표 이름을 작성해주세요.", "danger");
					$("#modifyLtoName").focus();
					return;
				}
			} else {
				if($("#modifyStoName").val() === ''){
					fn_alert("단기목표 이름을 작성해주세요.", "danger");
					$("#modifyStoName").focus();
					return;
				}
			}
		} else {
			if(editModalTarget === "dto") {
				if($("input[name=domainName]").length < 1){
					fn_alert("등록 할 영역을 추가해주세요.", "danger");
					return;
				}
			} else if(editModalTarget === "lto") {
				if($("input[name=ltoName]").length < 1){
					fn_alert("등록 할 장기목표를 추가해주세요.", "danger");
					return;
				}
			} else {
				if($("input[name=stoName]").length < 1){
					fn_alert("등록 할 단기목표를 추가해주세요.", "danger");
					return;
				}
			}
		}
		fn_saveItemData();
	});
	
	$("#tmpDomainAddBtn").on("click", function() {
		editModalTarget = "dto";
		isEditModalAdd = true;
		
		$(".domainItem").remove();
		$("#addDomainName").val("");
		$("#domainEditModal").modal("show");
		fn_checkItemEmpty("domainName");
	});

	$("#tmpLtoAddBtn").on("click", function() {
		if(!selectDomainSeq){
			fn_alert("영역을 선택하세요.", "warning");
			return;
		}
		editModalTarget = "lto";
		isEditModalAdd = true;
		
		$(".ltoItem").remove();
		$("#addLtoName").val("");
		$("#ltoEditModal").modal("show");
		fn_checkItemEmpty("ltoName");
	});
	
	$("#tmpStoAddBtn").on("click", function() {
		if(!selectLtoSeq){
			fn_alert("장기목표를 선택하세요.", "warning");
			return;
		}
		editModalTarget = "sto";
		isEditModalAdd = true;
		
		$(".stoItem").remove();
		$("#addStoName").val("");
		$("#stoEditModal").modal("show");
		fn_checkItemEmpty("stoName");
	});
	
	$("#domainListAddBtn").on("click", function() {
		var domainName = $("#addDomainName").val();
		var html = ''; 
		
		html += '	<div class="input-group mb-2 domainItem">';
		html += '		<input type="text" class="form-control" name="domainName" value="'+domainName+'" disabled>';
		html += '		<button class="btn btn-outline-secondary" type="button" onclick="fn_itemRemove(this)">';
		html += '			<i class="bi bi-x-lg"></i>';
		html += '		</button>';
		html += '	</div>';
		
		if(domainName) {
			$("#domainList").append(html);
			$("#addDomainName").val("");
		}
		
		fn_checkItemEmpty("domainName");
	});
	
	$("#ltoListAddBtn").on("click", function() {
		var ltoName = $("#addLtoName").val();
		var html = ''; 
		
		html += '	<div class="input-group mb-2 ltoItem">';
		html += '		<input type="text" class="form-control" name="ltoName" value="'+ltoName+'" disabled>';
		html += '		<button class="btn btn-outline-secondary" type="button" onclick="fn_itemRemove(this)">';
		html += '			<i class="bi bi-x-lg"></i>';
		html += '		</button>';
		html += '	</div>';
		
		if(ltoName) {
			$("#ltoList").append(html);
			$("#addLtoName").val("");
		}
		
		fn_checkItemEmpty("ltoName");
	});
	
	$("#stoListAddBtn").on("click", function() {
		var stoName = $("#addStoName").val();
		var html = ''; 
		
		html += '	<div class="input-group mb-2 stoItem">';
		html += '		<input type="text" class="form-control" name="stoName" value="'+stoName+'" disabled>';
		html += '		<button class="btn btn-outline-secondary" type="button" onclick="fn_itemRemove(this)">';
		html += '			<i class="bi bi-x-lg"></i>';
		html += '		</button>';
		html += '	</div>';
		
		if(stoName) {
			$("#stoList").append(html);
			$("#addStoName").val("");
		}
		
		fn_checkItemEmpty("stoName");
	});
	
	$(".modal").on("shown.bs.modal", function() {
		if(isEditModalAdd){
			$(".modalAddArea").show();
			$(".modalModifyArea").hide();
		} else {
			$(".modalAddArea").hide();
			$(".modalModifyArea").show();
		}
	});
	
	$.init = function() {
		fn_makeTmpDomainList();
	};
	
	$.init();
});

function fn_saveItemData() {
	var url = fn_getEditUrl();
	var param = fn_getEditParam();
	
	$.ajax({
		url: url
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			$(".modal").modal("hide");
			
			if(editModalTarget === "dto") {
				fn_makeTmpDomainList();
			} else if(editModalTarget === "lto") {
				fn_makeTmpLtoList();
			} else if(editModalTarget === "sto") {
				fn_makeTmpStoList();
			}
		}
		, error : function(request, status, error) {
			fn_alert("저장에 실패했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

function fn_getEditParam() {
	var param = {};
	if(editModalTarget === "dto") {
		var domainName = "";
		if(isEditModalAdd) {
			$("input[name=domainName]").each(function(index, element) {
				domainName += $(this).val();
				if(index < $("input[name=domainName]").length - 1){
					domainName += "||";
				}
			});
		} else {
			domainName = $("#modifyDomainName").val();
			param.domainSeq = editSeq;
		}
		param.domainName = domainName;
		param.domainContents = '';
		param.centerSeq = sessionStorage.getItem("centerSeq");
		
	} else if(editModalTarget === "lto") {
		var ltoName = "";
		if(isEditModalAdd) {
			$("input[name=ltoName]").each(function(index, element) {
				ltoName += $(this).val();
				if(index < $("input[name=ltoName]").length - 1){
					ltoName += "||";
				}
			});
		} else {
			ltoName = $("#modifyLtoName").val();
			param.ltoSeq = editSeq;
		}
		param.domainSeq = selectDomainSeq;
		param.ltoName = ltoName;
		param.ltoContents = '';
	} else {
		var stoName = "";
		if(isEditModalAdd) {
			$("input[name=stoName]").each(function(index, element) {
				stoName += $(this).val();
				if(index < $("input[name=stoName]").length - 1){
					stoName += "||";
				}
			});
		} else {
			stoName = $("#modifyStoName").val();
			param.stoSeq = editSeq;
		}
		param.ltoSeq = selectLtoSeq;
		param.stoName = stoName;
		param.stoContents = '';
		param.stoTrialCnt = $("#stoTrialCnt").val();
		param.stoArrStdPst = $("#stoArrStdPst").val();
		param.stoUrgContents = $("#stoUrgContents").val();
		param.stoRnfcContents = $("#stoRnfcContents").val();
	}
	
	return param;
}

function fn_getEditUrl() {
	var url = '/tpm/ajax.';
	
	if(isEditModalAdd) {
		url += 'insert';
	} else {
		url += 'update';
	}
	
	if(editModalTarget === "dto") {
		url += "Domain";
	} else if(editModalTarget === "lto") {
		url += "Lto";
	} else {
		url += "Sto";
	}
	
	return url;
}

function fn_itemRemove(obj) {
	var name = $(obj).parent().children("input").attr("name");
	$(obj).parent().remove();
	fn_checkItemEmpty(name);
}

function fn_checkItemEmpty(name) {
	if($("input[name="+name+"]").length > 0) {
		$(".emptyContents").hide();
	} else {
		$(".emptyContents").show();
	}
}

function fn_setSelectSeq() {
	selectDomainSeq = $(".dto-item.active").data("seq");
	selectLtoSeq = $(".lto-item.active").data("seq");
	selectStoSeq = $(".sto-item.active").data("seq");
	
	$("#dtoLabel").text($(".dto-item.active > span:eq(0)").text());
	$("#ltoLabel").text($(".lto-item.active > span:eq(0)").text());
	$("#stoLabel").text($(".sto-item.active > span:eq(0)").text());
	
	$("#ltoLabel").text() !== "" ? $("#ltoLabel").show() : $("#ltoLabel").hide();
	$("#stoLabel").text() !== "" ? $("#stoLabel").show() : $("#stoLabel").hide();

	fn_setStoDatailArea();
}

/* *********************************
 * 도메인 조작
 ********************************* */
function fn_makeTmpDomainList() {
	var tmpDomainList = fn_selectTmpDomain();
	var html = '';
	
	tmpDomainList.forEach(function(item, index, array) {
		html += '	<li class="list-group-item dto-item" data-seq="'+item.domainSeq+'" data-order="'+item.domainSortOrder+'">';
		html += '		<span>'+item.domainName+'</span>';
		html += '		<div class="orderBtnArea" '+(!isEditMode ? '' : 'style="display: none;"')+'>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order" data-type="up" data-target="dto">';
		html += '				<i class="bi bi-caret-up-fill"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order" data-type="down" data-target="dto">';
		html += '				<i class="bi bi-caret-down-fill"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '		<div class="editBtnArea" '+(isEditMode ? '' : 'style="display: none;"')+'>'; 
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm editBtn" data-target="dto">';
		html += '				<i class="bi bi-pencil-square"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm removeBtn" data-target="dto">';
		html += '				<i class="bi bi-trash"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '	</li>';
	});

	$("#tmpStoListArea").empty();
	$("#tmpLtoListArea").empty();
	$("#tmpDomainListArea").empty();
	$("#tmpDomainListArea").append(html);
	fn_renderTmpDomainItemEvent();
	
	fn_setSelectSeq();
}

function fn_renderTmpDomainItemEvent() {
	$(".dto-item").on('click', function (e) {
		if(!$(e.target).hasClass("bi")){
			$(".dto-item").removeClass('active');
			$(this).addClass('active');
			
			fn_setSelectSeq();
			
			//lto 리스트 생성
			fn_makeTmpLtoList();
		}
	});
}

function fn_selectTmpDomain(domainSeq) {
	
	var returnData = null;
	var param = {
			centerSeq : sessionStorage.getItem("centerSeq")
	};
	
	if(domainSeq) {
		param.domainSeq = domainSeq;
	}
	
	$.ajax({
		url: "/tpm/ajax.selectTmpDomain"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			returnData = data.tmpDomainList;
		}
		, error : function(request, status, error) {
			fn_alert("영역 정보를 조회하지 못했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
	
	return returnData;
}

/* *********************************
 * LTO 조작
 ********************************* */
function fn_makeTmpLtoList() {
	var tmpLtoList = fn_selectTmpLto();
	var html = '';
	
	tmpLtoList.forEach(function(item, index, array) {
		html += '	<li class="list-group-item lto-item" data-seq="'+item.ltoSeq+'" data-order="'+item.ltoSortOrder+'">';
		html += '		<span>'+item.ltoName+'</span>';
		html += '		<div class="orderBtnArea" '+(!isEditMode ? '' : 'style="display: none;"')+'>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order" data-type="up" data-target="lto">';
		html += '				<i class="bi bi-caret-up-fill"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order" data-type="down" data-target="lto">';
		html += '				<i class="bi bi-caret-down-fill"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '		<div class="editBtnArea" '+(isEditMode ? '' : 'style="display: none;"')+'>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm editBtn" data-target="lto">';
		html += '				<i class="bi bi-pencil-square"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm removeBtn" data-target="lto">';
		html += '				<i class="bi bi-trash"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '	</li>';
	});
	$("#tmpStoListArea").empty();
	$("#tmpLtoListArea").empty();
	$("#tmpLtoListArea").append(html);
	fn_renderTmpLtoItemEvent();
	
	fn_setSelectSeq();
}

function fn_renderTmpLtoItemEvent() {
	$(".lto-item").on('click', function (e) {
		if(!$(e.target).hasClass("bi")){
			$(".lto-item").removeClass('active');
			$(this).addClass('active');
			$("#tmpStoListArea").empty();
			
			fn_setSelectSeq();
			
			//sto 리스트 생성
			fn_makeTmpStoList();
		}
	});
}

function fn_selectTmpLto(ltoSeq) {
	
	var returnData = null;
	var param = {
		domainSeq : selectDomainSeq
	};
	
	if(ltoSeq) {
		param.ltoSeq = ltoSeq;
	}
	
	$.ajax({
		url: "/tpm/ajax.selectTmpLto"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			returnData = data.tmpLtoList;
		}
		, error : function(request, status, error) {
			fn_alert("장기목표 정보를 조회하지 못했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
	
	return returnData;
}

/* *********************************
 * STO 조작
 ********************************* */
function fn_makeTmpStoList() {
	var tmpStoList = fn_selectTmpSto();
	var html = '';
	
	tmpStoList.forEach(function(item, index, array) {
		html += '	<li class="list-group-item sto-item" data-seq="'+item.stoSeq+'" data-order="'+item.stoSortOrder+'">';
		html += '		<span>'+item.stoName+'</span>';
		html += '		<div class="orderBtnArea" '+(!isEditMode ? '' : 'style="display: none;"')+'>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order" data-type="up" data-target="sto">';
		html += '				<i class="bi bi-caret-up-fill"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm order" data-type="down" data-target="sto">';
		html += '				<i class="bi bi-caret-down-fill"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '		<div class="editBtnArea" '+(isEditMode ? '' : 'style="display: none;"')+'>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm editBtn" data-target="sto">';
		html += '				<i class="bi bi-pencil-square"></i>';
		html += '			</button>';
		html += '			<button type="button" class="btn btn-outline-secondary btn-sm removeBtn" data-target="sto">';
		html += '				<i class="bi bi-trash"></i>';
		html += '			</button>';
		html += '		</div>';
		html += '	</li>';
	});
	
	$("#tmpStoListArea").empty();
	$("#tmpStoListArea").append(html);
	fn_renderTmpStoItemEvent();
	
	fn_setSelectSeq();
}

function fn_renderTmpStoItemEvent() {
	$(".sto-item").on('click', function (e) {
		if(!$(e.target).hasClass("bi")){
			$(".sto-item").removeClass('active');
			$(this).addClass('active');
			
			fn_setSelectSeq();
		}
	});
}

function fn_selectTmpSto(stoSeq) {
	
	var returnData = null;
	var param = {
		ltoSeq : selectLtoSeq
	};
	
	if(stoSeq) {
		param.stoSeq = stoSeq;
	}
	
	$.ajax({
		url: "/tpm/ajax.selectTmpSto"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			returnData = data.tmpStoList;
		}
		, error : function(request, status, error) {
			fn_alert("영역 정보를 조회하지 못했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
	
	return returnData;
}

function fn_setStoDatailArea() {
	
	if(selectStoSeq){
		var stoDetail = fn_selectTmpSto(selectStoSeq)[0];
		$("#detailStoName").text(stoDetail.stoName);
		$("#detailStoTrialCnt").text(stoDetail.stoTrialCnt);
		$("#detailStoArrStdPst").text(stoDetail.stoArrStdPst + " %");
		$("#detailStoUrgContents").text(stoDetail.stoUrgContents);
		$("#detailStoRnfcContents").text(stoDetail.stoRnfcContents);
	} else {
		$("#detailStoName").text("");
		$("#detailStoTrialCnt").text("");
		$("#detailStoArrStdPst").text("");
		$("#detailStoUrgContents").text("");
		$("#detailStoRnfcContents").text("");
	}
	
}

/* *********************************
 * edit 버튼 조작
 ********************************* */
function fn_onclickOrderBtn(targetArea, targerOrder, upDown) {
	
	var targetIndex = Number(targerOrder)-1;
	var beforeIndex = Number(targetIndex)-1;
	var afterIndex = Number(targetIndex)+1;
	
	var beforeOrder = Number(targerOrder)-1;
	var afterOrder = Number(targerOrder)+1;
	
	if(upDown === "up"){
		$("."+targetArea+"-item:eq("+targetIndex+")").attr("data-order", beforeOrder);
		$("."+targetArea+"-item:eq("+beforeIndex+")").attr("data-order", targerOrder);
		$("."+targetArea+"-item:eq("+targetIndex+")").insertBefore($("."+targetArea+"-item:eq("+beforeIndex+")"));
	} else {
		$("."+targetArea+"-item:eq("+targetIndex+")").attr("data-order", afterOrder);
		$("."+targetArea+"-item:eq("+afterIndex+")").attr("data-order", targerOrder);
		$("."+targetArea+"-item:eq("+targetIndex+")").insertAfter($("."+targetArea+"-item:eq("+afterIndex+")"));
	}

}

function fn_updateSortOrder(targetArea, seq, order, updown) {
	var oldSortOrder = Number(order);
	var newSortOrder = (updown==="up" ? Number(order)-1 : Number(order)+1);
	
	var param = {
		target : targetArea,
		seq : seq,
		oldSortOrder : oldSortOrder,
		newSortOrder : newSortOrder
	};
	
	$.ajax({
		url: "/tpm/ajax.updateSortOrder"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
		}
		, error : function(request, status, error) {
			fn_alert("정렬 순서가 업데이트 되지 않았습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}

$(document).on("click", ".order", function() {
	var targetArea = $(this).data("target");
	var targetOrder = $(this).parent().parent().attr("data-order");
	var upDown = $(this).data("type");
	var seq = $(this).parent().parent().data("seq");
	
	var last = Number($("."+targetArea+"-item").last().attr("data-order"));
	
	if( (Number(targetOrder) === 1 && upDown === "up") 
		|| (Number(targetOrder) === last && upDown === "down") ){
		return;
	}
	
	fn_onclickOrderBtn(targetArea, targetOrder, upDown);
	
	fn_updateSortOrder(targetArea, seq, targetOrder, upDown);
	
});

$(document).on("click", ".removeBtn", function() {
	removeSeq = $(this).parent().parent().data("seq");
	removeTarget = $(this).data("target");
	
	fn_confirm("정말 삭제하시겠습니까?", fn_deleteProgram, "danger")
});

$(document).on("click", ".editBtn", function() {
	editSeq = $(this).parent().parent().data("seq");
	editModalTarget = $(this).data("target");
	isEditModalAdd = false;
	
	if(editModalTarget === "dto") {1
		
		$("#modifyDomainName").val($(this).parent().parent().children("span:eq(0)").text());
		$("#domainEditModal").modal("show");

	} else if (editModalTarget === "lto") {
		$("#modifyLtoName").val($(this).parent().parent().children("span:eq(0)").text());
		$("#ltoEditModal").modal("show");
		
	} else {
		var stoDetail = fn_selectTmpSto(selectStoSeq)[0];
		$("#modifyStoName").val(stoDetail.stoName);
		$("#stoTrialCnt").val(stoDetail.stoTrialCnt);
		$("#stoArrStdPst").val(stoDetail.stoArrStdPst);
		$("#stoUrgContents").val(stoDetail.stoUrgContents);
		$("#stoRnfcContents").val(stoDetail.stoRnfcContents);
		
		$("#stoEditModal").modal("show");
	}
});

function fn_deleteProgram() {
	var param = {
		target : removeTarget,
		seq : removeSeq,
		domainSeq : selectDomainSeq,
		ltoSeq : selectLtoSeq,
		stoSeq : selectStoSeq,
		centerSeq : sessionStorage.getItem("centerSeq")
	};
	
	$.ajax({
		url: "/tpm/ajax.deleteProgram"
		, type : "post"
		, data : JSON.stringify(param)
		, contentType : 'application/json; charset=utf-8'
		, async : false
		, success : function(data) {
			if(removeTarget === "dto") {
				fn_makeTmpDomainList();
			} else if(removeTarget === "lto") {
				fn_makeTmpLtoList();
			} else if(removeTarget === "sto") {
				fn_makeTmpStoList();
			}
			
			removeSeq = null;
			removeTarget = null;
		}
		, error : function(request, status, error) {
			fn_alert("해당 프로그램을 삭제하지 못했습니다. 담당자에게 연락하세요.", "warning");
		}
	});
}
