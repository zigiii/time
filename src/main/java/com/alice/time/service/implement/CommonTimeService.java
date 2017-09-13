package com.alice.time.service.implement;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alice.time.bean.Time;
import com.alice.time.bean.TimeTarget;
import com.alice.time.common.ResponseResult;
import com.alice.time.dao.TimeDao;
import com.alice.time.dao.TimeTargetDao;
import com.alice.time.enumhouse.CodeEnum;
import com.alice.time.enumhouse.DateFormatEnum;
import com.alice.time.service.TimeService;
import com.alice.time.utils.DateUtil;

@Service("timeService")
@Transactional
public class CommonTimeService implements TimeService{
	
	@Autowired
	private TimeDao timeDao;
	
	@Autowired
	private TimeTargetDao timeTargetDao;
	
	@Value("${indexPageSize}")
	private int indexPageSize;

	@Override
	public List<Time> queryAll() {
		return timeDao.queryAll();
	}

	@Override
	public ResponseResult queryMostImportantTime() {
		Time time = timeDao.queryMostImportantTime(1,0,1);
		ResponseResult result = new ResponseResult();
		if(null != time){
			result.setCode(CodeEnum.SUCCESS.getCode());
			result.setData(time);
		}else{
			result.setCode(CodeEnum.FAILURE.getCode());
		}
		return result;
	}
	
	@Override
	public ResponseResult queryPagingTime(int pageNum) {
		List<Time> timeList = timeDao.queryPagingTime(1,pageNum,indexPageSize);
		ResponseResult result = new ResponseResult();
		if(null != timeList){
			int total = 0;
			if(timeList.size() > 0){
				total = timeDao.countTime(1);
			}
			Map<String, Object> resultMap = new HashMap<>();
			resultMap.put("total", total);
			resultMap.put("dataList", timeList);
			result.setCode(CodeEnum.SUCCESS.getCode());
			result.setData(resultMap);
		}else{
			result.setCode(CodeEnum.FAILURE.getCode());
		}
		return result;
	}

	@Override
	public ResponseResult deferTime(Time time) {
		ResponseResult result = new ResponseResult();
		String timeMode = time.getTimeMode();
		TimeTarget timeTarget = new TimeTarget();
		//根据不同模型延长不同倒计时表100目标,200节日
		if("100".equals(timeMode)){
			timeTarget.setTargetId(time.getTimeId());
			String deferDate = afterDeferDate(time.getTimeExpireDate(),time.getCycleDate(),time.getCycleType());
			timeTarget.setTargetExpireDate(deferDate);
			timeTarget.setUpdateDate(DateUtil.getCurrentDate(DateFormatEnum.YYYYMMDDHHMMSS));
		}else if("200".equals(timeMode)){
		}
		int line = timeTargetDao.updateTimeTarget(timeTarget);
		if(line > 0){
			result.setCode(CodeEnum.SUCCESS.getCode());
		}else{
			result.setCode(CodeEnum.FAILURE.getCode());
		}
		return result;
	}
	
	@Override
	public ResponseResult changeOverStatus(Time time) {
		ResponseResult result = new ResponseResult();
		String timeMode = time.getTimeMode();
		TimeTarget timeTarget = new TimeTarget();
		if("100".equals(timeMode)){
			timeTarget.setTargetId(time.getTimeId());
			timeTarget.setTargetStatus("99");
		}else if("200".equals(timeMode)){
		}
		int line = timeTargetDao.updateTimeTarget(timeTarget);
		if(line > 0){
			result.setCode(CodeEnum.SUCCESS.getCode());
		}else{
			result.setCode(CodeEnum.FAILURE.getCode());
		}
		return result;
	}
	
	private String afterDeferDate(String expireDate,String cycleDate,String cycleType){
		String deferDate = null;
		if("1".equals(cycleType)){
			deferDate = DateUtil.addMinute(expireDate, Integer.parseInt(cycleDate));
		}else if("2".equals(cycleType)){
			deferDate = DateUtil.addHour(expireDate, Integer.parseInt(cycleDate));
		}else if("3".equals(cycleType)){
			deferDate = DateUtil.addDay(expireDate, Integer.parseInt(cycleDate));
		}else if("5".equals(cycleType)){
			deferDate = DateUtil.addMonth(expireDate, Integer.parseInt(cycleDate));
		}else if("6".equals(cycleType)){
			deferDate = DateUtil.addYear(expireDate, Integer.parseInt(cycleDate));
		}
		return deferDate;
		
	}

}

