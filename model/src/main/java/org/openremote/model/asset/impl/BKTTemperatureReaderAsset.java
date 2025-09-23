/*
 * Copyright 2024, BKT Tyres
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.openremote.model.asset.impl;

import org.openremote.model.asset.Asset;
import org.openremote.model.asset.AssetDescriptor;
import org.openremote.model.attribute.MetaItem;
import org.openremote.model.value.AttributeDescriptor;
import org.openremote.model.value.MetaItemType;
import org.openremote.model.value.ValueConstraint;
import org.openremote.model.value.ValueType;

import jakarta.persistence.Entity;
import java.util.Optional;

import static org.openremote.model.Constants.*;

/**
 * BKT Temperature Reader asset for monitoring temperature sensors
 */
@Entity
public class BKTTemperatureReaderAsset extends Asset<BKTTemperatureReaderAsset> {

    public static final AttributeDescriptor<Double> TEMPERATURE = new AttributeDescriptor<>("temperature", ValueType.NUMBER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_CELSIUS);

    public static final AttributeDescriptor<Double> HUMIDITY = new AttributeDescriptor<>("humidity", ValueType.POSITIVE_NUMBER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_PERCENTAGE).withConstraints(new ValueConstraint.Min(0), new ValueConstraint.Max(100));

    public static final AttributeDescriptor<Boolean> ALARM_STATUS = new AttributeDescriptor<>("alarmStatus", ValueType.BOOLEAN,
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    public static final AssetDescriptor<BKTTemperatureReaderAsset> DESCRIPTOR = new AssetDescriptor<>("thermometer", "F44336", BKTTemperatureReaderAsset.class);

    /**
     * For use by hydrators (i.e. JPA/Jackson)
     */
    protected BKTTemperatureReaderAsset() {
    }

    public BKTTemperatureReaderAsset(String name) {
        super(name);
    }

    public Optional<Double> getTemperature() {
        return getAttributes().getValue(TEMPERATURE);
    }

    public Optional<Double> getHumidity() {
        return getAttributes().getValue(HUMIDITY);
    }

    public Optional<Boolean> getAlarmStatus() {
        return getAttributes().getValue(ALARM_STATUS);
    }
}
