package com.ddx.manage.common.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.text.SimpleDateFormat;

/**
 * json 转换工具
 */
public class JSONUtils {
    /**
     * json反序列化
     *
     * @param result 转换源
     * @param clazz  目标对象
     * @param <T>    泛型
     * @return 泛型对象
     * @throws Exception
     */
    public static <T> T parse(String result, Class<T> clazz) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        // 自定义时间格式转换
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        mapper.setDateFormat(dateFormat);
        return mapper.readValue(result, clazz);
    }

    /**
     * json序列化
     *
     * @param t              目标对象
     * @param <T>            泛型
     * @param pretty         是否美化json格式
     * @param includeNonNull 只包含非空值
     * @param nullToEmpty    null转换为空字符串
     * @return 序列化结果
     * @throws Exception
     */
    public static <T> String parse(T t, boolean pretty, boolean includeNonNull, boolean nullToEmpty) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        if (includeNonNull) {
            mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        }

        if (nullToEmpty) {
            mapper.getSerializerProvider().setNullValueSerializer(new JsonSerializer<Object>() {
                @Override
                public void serialize(Object value, JsonGenerator jg, SerializerProvider sp) throws IOException {
                    jg.writeString("");
                }
            });
        }

        if (pretty) {
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(t);
        } else {
            return mapper.writeValueAsString(t);
        }
    }
}
