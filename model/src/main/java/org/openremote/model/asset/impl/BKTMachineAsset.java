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
 * BKT Machine asset representing manufacturing equipment and machinery
 */
@Entity
public class BKTMachineAsset extends Asset<BKTMachineAsset> {

    public static final AssetDescriptor<BKTMachineAsset> DESCRIPTOR = new AssetDescriptor<>("img:bkt-machine", "4CAF50", BKTMachineAsset.class);

    public static final AttributeDescriptor<Boolean> STATUS = new AttributeDescriptor<>("status", ValueType.BOOLEAN,
        new MetaItem<>(MetaItemType.LABEL, "Running"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    public static final AttributeDescriptor<Double> VIBRATION_LEVEL = new AttributeDescriptor<>("vibration", ValueType.POSITIVE_NUMBER,
        new MetaItem<>(MetaItemType.LABEL, "Vibration"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_MILLI, UNITS_METRE, UNITS_PER, UNITS_SECOND);

    public static final AttributeDescriptor<Double> TEMPERATURE = new AttributeDescriptor<>("temperature", ValueType.NUMBER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_CELSIUS);

    public static final AttributeDescriptor<Long> LAST_MAINTENANCE = new AttributeDescriptor<>("lastMaintenance", ValueType.TIMESTAMP,
        new MetaItem<>(MetaItemType.LABEL, "Last Maintenance Time"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    /**
     * For use by hydrators (i.e. JPA/Jackson)
     */
    protected BKTMachineAsset() {
    }

    public BKTMachineAsset(String name) {
        super(name);
    }

    public Optional<Boolean> getStatus() {
        return getAttributes().getValue(STATUS);
    }

    public Optional<Double> getVibrationLevel() {
        return getAttributes().getValue(VIBRATION_LEVEL);
    }

    public Optional<Double> getTemperature() {
        return getAttributes().getValue(TEMPERATURE);
    }

    public Optional<Long> getLastMaintenance() {
        return getAttributes().getValue(LAST_MAINTENANCE);
    }
}
